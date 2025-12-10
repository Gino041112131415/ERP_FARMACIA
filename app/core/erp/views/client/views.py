from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from core.erp.models import Client
from core.forms import ClientForm


class ClientListView(ListView):
    model = Client
    template_name = 'client/list.html'

    def get_queryset(self):
        return Client.objects.all()

    @method_decorator(csrf_exempt)
    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'searchdata':
                data = []
                for i in Client.objects.all():
                    data.append(i.toJSON())
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de Clientes'
        context['create_url'] = reverse_lazy('erp:client_create')
        context['entity'] = 'Clientes'
        context['list_url'] = reverse_lazy('erp:client_list')
        context['form'] = ClientForm()  # Para el modal
        return context


class ClientCreateView(CreateView):
    model = Client
    form_class = ClientForm

    def get(self, request, *args, **kwargs):
        return JsonResponse({'error': 'Método no permitido'}, status=405)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST.get('action')
            if action == 'add':
                form = self.get_form()
                data = form.save()
            else:
                data['error'] = 'No ha ingresado a ninguna opción'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data)


    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Crear Cliente'
        context['entity'] = 'Clientes'
        context['list_url'] = reverse_lazy('erp:client_list')
        context['action'] = 'add'
        return context


class ClientUpdateView(UpdateView):
    model = Client
    form_class = ClientForm
    template_name = 'client/create.html'
    success_url = reverse_lazy('erp:client_list')

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'edit':
                form = self.get_form()
                data = form.save()
            else:
                data['error'] = 'No ha ingresado a ninguna opción'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Edición Cliente'
        context['entity'] = 'Clientes'
        context['list_url'] = reverse_lazy('erp:client_list')
        context['action'] = 'edit'
        return context


class ClientDeleteView(DeleteView):
    model = Client
    template_name = 'client/delete.html'
    success_url = reverse_lazy('erp:client_list')

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            self.object.delete()
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Eliminación de un Cliente'
        context['entity'] = 'Clientes'
        context['list_url'] = reverse_lazy('erp:client_list')
        return context
