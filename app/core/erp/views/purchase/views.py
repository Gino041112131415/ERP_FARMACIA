from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import CreateView, TemplateView, ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from core.erp.mixins import validarPermisos
from core.forms import PurchaseForm

# 🔹 IMPORTANTE: agregamos InventoryMovement
from core.erp.models import Purchase, DetPurchase, Product, InventoryMovement

import json
from decimal import Decimal
from datetime import datetime


# ===========================================
# PASO 1: CREAR COMPRA
# ===========================================
class PurchaseCreateView(LoginRequiredMixin, validarPermisos, CreateView):
    model = Purchase
    form_class = PurchaseForm
    template_name = 'purchase/create.html'
    permission_required = 'erp.add_purchase'
    success_url = reverse_lazy('erp:purchase_list')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            form = self.get_form()

            if form.is_valid():
                purchase = form.save(commit=False)
                purchase.status = "pending"
                purchase.save()

                data = {
                    "error": "",
                    "redirect_url": reverse_lazy(
                        "erp:purchase_products",
                        kwargs={"pk": purchase.id}
                    )
                }
            else:
                data["error"] = form.errors

        except Exception as e:
            data["error"] = str(e)

        return JsonResponse(data)


# ===========================================
# PASO 2: AGREGAR PRODUCTOS A LA COMPRA
# ===========================================
class PurchaseProductsView(LoginRequiredMixin, validarPermisos, TemplateView):
    template_name = 'purchase/products.html'
    permission_required = 'erp.add_purchase'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        action = request.POST.get('action')
        data = {}
        purchase = get_object_or_404(Purchase, pk=self.kwargs['pk'])

        try:
            # ------- BUSCAR PRODUCTOS -------
            if action == 'search_products':
                term = request.POST.get('term', '')
                prods = Product.objects.filter(name__icontains=term)[:10]
                data = []

                for p in prods:
                    item = p.toJSON()
                    item['value'] = p.name   # para el autocomplete
                    data.append(item)

                return JsonResponse(data, safe=False)

            # ------- GUARDAR DETALLES (solo prod + cantidad) -------
            elif action == 'add_details':
                details = json.loads(request.POST['details'])

                # Borramos cualquier detalle anterior de esa compra
                DetPurchase.objects.filter(purchase=purchase).delete()

                for d in details:
                    det = DetPurchase()
                    det.purchase = purchase
                    det.prod_id = d['id']
                    det.quantity = int(d.get('quantity', 0))

                    # Por ahora NO manejamos precios ni vencimiento aquí
                    det.purchase_price = 0
                    det.sale_price = 0
                    det.expiration_date = None
                    det.subtotal = 0

                    det.save()

                data = {
                    'error': '',
                    'success': 'Productos registrados correctamente.',
                    'redirect_url': reverse_lazy('erp:purchase_list')
                }

            else:
                data['error'] = 'Acción no válida.'

        except Exception as e:
            data['error'] = str(e)

        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        purchase = get_object_or_404(Purchase, pk=self.kwargs['pk'])
        context['purchase'] = purchase
        context['title'] = f'Compra Nº {purchase.id}'
        return context


# ===========================================
# PASO 3: LISTADO DE COMPRAS + ACEPTAR STOCK
# ===========================================
class PurchaseListView(LoginRequiredMixin, validarPermisos, ListView):
    model = Purchase
    template_name = 'purchase/list.html'
    permission_required = 'erp.view_purchase'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        action = request.POST.get('action')
        data = {}

        try:
            # =========================
            # LISTAR COMPRAS
            # =========================
            if action == "list":
                data = []
                for p in Purchase.objects.all().order_by('-id'):
                    item = p.toJSON()
                    data.append(item)
                return JsonResponse(data, safe=False)

            # =========================
            # ACEPTAR COMPRA → SUMAR STOCK + MOVIMIENTO
            # =========================
            elif action == "accept":
                purchase_id = request.POST.get('id')
                purchase = get_object_or_404(Purchase, pk=purchase_id)

                if purchase.status == 'received':
                    data['error'] = 'Esta compra ya fue marcada como recibida.'
                else:
                    details = DetPurchase.objects.filter(purchase=purchase)

                    for det in details:
                        prod = det.prod

                        # Stock antes de la compra
                        stock_before = prod.stock

                        # Actualizar stock
                        prod.stock += det.quantity
                        prod.save()

                        # 🔹 Registrar ENTRADA en movimientos de inventario
                        InventoryMovement.objects.create(
                            product=prod,
                            movement_type='IN',           # entrada por compra
                            quantity=det.quantity,
                            reference="Compra",
                            user=request.user,
                            stock_before=stock_before,
                            stock_after=prod.stock,
                        )

                    purchase.status = 'received'
                    purchase.save()

                    data['success'] = 'Compra recibida, stock actualizado y movimientos registrados.'

            # =========================
            # ELIMINAR COMPRA
            # =========================
            elif action == "delete":
                purchase_id = request.POST.get('id')
                purchase = get_object_or_404(Purchase, pk=purchase_id)
                purchase.delete()
                data['success'] = 'Compra eliminada correctamente.'

            # =========================
            # DETALLE PARA MODAL
            # =========================
            elif action == "detail":
                purchase_id = request.POST.get('id')
                purchase = get_object_or_404(Purchase, pk=purchase_id)

                detail_list = []
                for det in DetPurchase.objects.filter(purchase=purchase):
                    detail_list.append({
                        'id': det.id,
                        'product': det.prod.name,
                        'category': det.prod.cate.name if det.prod.cate else '',
                        'quantity': det.quantity,
                        'purchase_price': float(det.purchase_price),
                        'expiration_date': det.expiration_date.strftime('%Y-%m-%d') if det.expiration_date else '',
                        'subtotal': float(det.subtotal),
                    })

                return JsonResponse(detail_list, safe=False)

            # =========================
            # ACTUALIZAR DETALLE (P. COMPRA + VENCE)
            # =========================
            elif action == "update_detail":
                det_id = request.POST.get('det_id')
                det = get_object_or_404(DetPurchase, pk=det_id)

                # Precio de compra como Decimal
                purchase_price = Decimal(request.POST.get('purchase_price') or '0')

                # Fecha de vencimiento (string 'YYYY-MM-DD' → date)
                exp_str = request.POST.get('expiration_date') or None
                if exp_str:
                    det.expiration_date = datetime.strptime(exp_str, '%Y-%m-%d').date()
                else:
                    det.expiration_date = None

                det.purchase_price = purchase_price
                det.subtotal = det.quantity * det.purchase_price
                det.save()

                data['success'] = 'Detalle actualizado correctamente.'

            else:
                data['error'] = 'Acción no válida.'

        except Exception as e:
            data['error'] = str(e)

        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de Compras'
        context['entity'] = 'Compras'
        context['create_url'] = reverse_lazy('erp:purchase_create')
        return context
