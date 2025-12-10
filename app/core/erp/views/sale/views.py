from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, get_object_or_404
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import CreateView, ListView, UpdateView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from core.erp.mixins import validarPermisos
from django.contrib.auth.mixins import LoginRequiredMixin
from django.template.loader import get_template
from xhtml2pdf import pisa

# 🔹 IMPORTANTE: agregamos InventoryMovement
from core.erp.models import Sale, DetSale, Product, InventoryMovement

from core.forms import SaleForm
from django.templatetags.static import static
from django.conf import settings
from django.contrib.staticfiles import finders
import os
import json


def link_callback(uri, rel):
    result = finders.find(uri.replace(settings.STATIC_URL, ''))
    if result:
        if not isinstance(result, (list, tuple)):
            result = [result]
        path = result[0]
    else:
        sUrl = settings.STATIC_URL
        sRoot = settings.STATIC_ROOT
        mUrl = settings.MEDIA_URL
        mRoot = settings.MEDIA_ROOT

        if uri.startswith(mUrl):
            path = os.path.join(mRoot, uri.replace(mUrl, ""))
        elif uri.startswith(sUrl):
            path = os.path.join(sRoot, uri.replace(sUrl, ""))
        else:
            return uri

    if not os.path.isfile(path):
        raise Exception("No se encontró el archivo: %s" % path)

    return path


# ==========================================================
# Crear Venta
# ==========================================================
class SaleCreateView(LoginRequiredMixin, validarPermisos, CreateView):
    model = Sale
    form_class = SaleForm
    template_name = 'sale/create.html'
    success_url = reverse_lazy('erp:sale_list')
    permission_required = 'erp.add_sale'
    url_redirect = success_url

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']

            # ===========================
            # BUSCAR PRODUCTOS
            # ===========================
            if action == 'search_products':
                data = []
                term = request.POST['term']
                prods = Product.objects.filter(name__icontains=term)[0:10]

                for i in prods:
                    item = i.toJSON()
                    item['value'] = i.name
                    data.append(item)

            # ===========================
            # REGISTRAR VENTA
            # ===========================
            elif action == 'add':
                vents = json.loads(request.POST['vents'])

                sale = Sale()
                sale.date_joined = vents['date_joined']
                sale.cli_id = vents['cli']
                sale.subtotal = float(vents['subtotal'])
                sale.iva = float(vents['iva'])
                sale.total = float(vents['total'])
                sale.save()

                # GUARDAR DETALLE, DESCONTAR STOCK Y CREAR MOVIMIENTO
                for i in vents['products']:
                    det = DetSale()
                    det.sale_id = sale.id
                    det.prod_id = i['id']
                    det.cant = int(i['cant'])
                    det.price = float(i['pvp'])
                    det.subtotal = float(i['subtotal'])
                    det.save()

                    prod = Product.objects.get(pk=i['id'])

                    # Stock antes de la venta (para el historial)
                    stock_before = prod.stock

                    if prod.stock < det.cant:
                        raise Exception(
                            f"Stock insuficiente para {prod.name}. Stock actual: {prod.stock}"
                        )

                    # Actualizar stock
                    prod.stock -= det.cant
                    prod.save()

                    # 🔹 Registrar SALIDA en movimientos de inventario
                    InventoryMovement.objects.create(
                        product=prod,
                        movement_type='OUT',          # salida por venta
                        quantity=det.cant,
                        reference="Venta",
                        user=request.user,
                        stock_before=stock_before,
                        stock_after=prod.stock,
                    )

                # DETECTAR STOCK BAJO
                low_stock_products = Product.objects.filter(stock__lte=10)

                data = {
                    "success": "Venta registrada correctamente.",
                    "low_stock": [
                        {"name": p.name, "stock": p.stock}
                        for p in low_stock_products
                    ]
                }

            else:
                data['error'] = 'No ha ingresado a ninguna opción'

        except Exception as e:
            data['error'] = str(e)

        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Creación de una Venta'
        context['entity'] = 'Ventas'
        context['list_url'] = self.success_url
        context['action'] = 'add'
        return context


# ==========================================================
# LISTADO DE VENTAS
# ==========================================================
class SaleListView(LoginRequiredMixin, validarPermisos, ListView):
    model = Sale
    template_name = 'sale/list.html'
    permission_required = 'erp.view_sale'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        action = request.POST.get('action')
        data = {}

        try:

            # 🔥 ALERTA AUTOMÁTICA DE STOCK BAJO
            if action == "low_stock":
                low_stock = Product.objects.filter(stock__lte=10)
                data = [
                    {"name": p.name, "stock": p.stock}
                    for p in low_stock
                ]
                return JsonResponse(data, safe=False)

            # LISTAR VENTAS
            if action == "list":
                data = []
                for sale in Sale.objects.all().order_by('-id'):
                    item = sale.toJSON()
                    item['calculated_iva'] = float(sale.subtotal) * (float(sale.iva) / 100)
                    data.append(item)
                return JsonResponse(data, safe=False)

            elif action == "products_detail":
                sale_id = request.POST.get('id')
                details = DetSale.objects.filter(sale_id=sale_id)
                data = [d.toJSON() for d in details]
                return JsonResponse(data, safe=False)

            elif action == "delete":
                sale_id = request.POST.get('id')
                sale = Sale.objects.get(pk=sale_id)
                sale.delete()
                data['success'] = 'Venta eliminada correctamente'

            elif action == "edit":
                sale = Sale.objects.get(pk=request.POST['id'])
                sale.date_joined = request.POST['date_joined']
                sale.subtotal = float(request.POST['subtotal'])
                sale.iva = float(request.POST['iva'])
                sale.total = float(request.POST['total'])
                sale.save()

                data['success'] = 'Venta editada correctamente'

            else:
                data['error'] = "Acción no válida."

        except Exception as e:
            data['error'] = str(e)

        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de Ventas'
        context['entity'] = 'Ventas'
        context['action'] = 'list'
        return context


# ==========================================================
# PDF FACTURA
# ==========================================================
class SaleInvoicePdfView(View):
    def get(self, request, *args, **kwargs):

        sale = get_object_or_404(Sale, pk=self.kwargs['pk'])
        template = get_template('sale/invoice.html')

        context = {
            'sale': sale,
            'comp': {
                'name': 'FARMA 90',
                'ruc': 'Siempre pensando en tu bienestar',
                'address': 'Cuidando de ti en cada paso',
            },
            'icon': static('img/farmacia.png'),
            'igv_calc': float(sale.subtotal) * (float(sale.iva) / 100),
        }

        html = template.render(context)

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename="invoice_%s.pdf"' % sale.id

        pisa_status = pisa.CreatePDF(
            html,
            dest=response,
            link_callback=link_callback,
        )

        if pisa_status.err:
            return HttpResponse(html)

        return response
