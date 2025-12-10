# core/erp/views/inventory.py

from django.http import JsonResponse
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from core.erp.mixins import validarPermisos
from core.erp.models import InventoryMovement


class InventoryMovementListView(LoginRequiredMixin, validarPermisos, ListView):
    """
    Listado de movimientos de inventario (entradas / salidas).
    Se usa con DataTables vía AJAX.
    """
    model = InventoryMovement
    template_name = 'inventory/list.html'
    permission_required = 'erp.view_product'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """
        Devuelve los movimientos en formato JSON para DataTables.
        Permite filtrar opcionalmente por rango de fechas
        y también eliminar un movimiento.
        """
        data = {}
        action = request.POST.get('action')

        try:
            if action == 'searchdata':
                # filtros opcionales (YYYY-MM-DD)
                start_date = request.POST.get('start_date')
                end_date = request.POST.get('end_date')

                qs = InventoryMovement.objects.all().order_by('-date', '-id')

                if start_date:
                    qs = qs.filter(date__date__gte=start_date)
                if end_date:
                    qs = qs.filter(date__date__lte=end_date)

                data = [m.toJSON() for m in qs]
                return JsonResponse(data, safe=False)

            elif action == 'delete':
                movement_id = request.POST.get('id')
                obj = InventoryMovement.objects.get(pk=movement_id)
                obj.delete()
                data['success'] = 'Movimiento eliminado correctamente.'

            else:
                data['error'] = 'Acción no válida.'
        except Exception as e:
            data['error'] = str(e)

        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Movimientos de inventario'
        context['entity'] = 'Movimientos de inventario'
        context['list_url'] = reverse_lazy('erp:inventory_movement_list')
        return context
