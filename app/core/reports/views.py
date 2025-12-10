from django.urls import reverse_lazy
from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from django.db.models import Sum  # lo puedes dejar aunque ya no lo usemos

from core.reports.forms import ReportForm
from core.erp.models import Sale
from datetime import datetime


@method_decorator(csrf_exempt, name='dispatch')
class ReportSaleView(TemplateView):
    template_name = 'sale/report.html'

    def post(self, request, *args, **kwargs):
        # por defecto un dict, por si hay error
        data = {}
        try:
            action = request.POST['action']

            if action == 'search_report':
                data = []  # aquí será la lista que DataTables necesita

                start_date = request.POST.get('start_date', '')
                end_date = request.POST.get('end_date', '')

                search = Sale.objects.all()

                # filtrar por rango si se envían ambas fechas
                if start_date and end_date:
                    start_date_obj = datetime.strptime(start_date, '%Y-%m-%d').date()
                    end_date_obj = datetime.strptime(end_date, '%Y-%m-%d').date()
                    search = search.filter(date_joined__range=[start_date_obj, end_date_obj])

                # acumuladores para la fila de totales
                subtotal_total = 0.0
                igv_total = 0.0
                total_total = 0.0

                # filas "normales"
                for s in search:
                    try:
                        cliente_nombre = f'{s.cli.names} {s.cli.surnames}'
                    except Exception:
                        cliente_nombre = str(s.cli) if s.cli else ''

                    # valores numéricos
                    subtotal = float(s.subtotal or 0)
                    iva_percent = float(s.iva or 0)      # 18, 0, etc.
                    igv_monto = subtotal * iva_percent / 100.0
                    total = float(s.total or 0)

                    # acumulamos para la fila final
                    subtotal_total += subtotal
                    igv_total += igv_monto
                    total_total += total

                    data.append([
                        s.id,
                        cliente_nombre,
                        s.date_joined.strftime('%Y-%m-%d'),
                        format(subtotal, '.2f'),
                        format(igv_monto, '.2f'),  # 🔥 IGV CALCULADO
                        format(total, '.2f'),
                    ])

                # ===== Fila de TOTALES (con montos correctos) =====
                data.append([
                    '---',
                    '---',
                    '---',
                    format(subtotal_total, '.2f'),
                    format(igv_total, '.2f'),
                    format(total_total, '.2f'),
                ])

            else:
                data = {'error': 'Ha ocurrido un error'}

        except Exception as e:
            # mostramos el error en consola y devolvemos un dict con 'error'
            print('ERROR EN ReportSaleView:', e)
            data = {'error': str(e)}

        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Reporte de las Ventas'
        context['entity'] = 'Reportes'
        context['list_url'] = reverse_lazy('sale_report')
        context['form'] = ReportForm()
        return context
