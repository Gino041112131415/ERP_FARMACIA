from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, FormView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from core.erp.models import Product
from core.forms import ProductForm  # 👈 asegúrate que existe este form


# --- Vista basada en función ---
def product_list(request):
    data = {
        'title': 'Listado de Productos',
        'products': Product.objects.all()
    }
    return render(request, 'product/list.html', data)


# --- Vista basada en clase ---
class ProductListView(ListView):
    model = Product
    template_name = 'product/list.html'

    def get_queryset(self):
        return Product.objects.all()

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
                for i in Product.objects.all():
                    data.append(i.toJSON())  
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de Productos'
        context['create_url'] = reverse_lazy('erp:product_create')
        context['entity'] = 'Productos'
        context['list_url'] = reverse_lazy('erp:product_list')
        return context


# --- CREAR ---
class ProductCreateView(CreateView):
    model = Product
    form_class = ProductForm
    template_name = 'product/create.html'
    success_url = reverse_lazy('erp:product_list')

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    
    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
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
        context['title'] = 'Crear Producto'
        context['entity'] = 'Productos'
        context['list_url'] = reverse_lazy('erp:product_list')
        context['action'] = 'add'
        return context


# --- EDITAR ---
class ProductUpdateView(UpdateView):
    model = Product
    form_class = ProductForm
    template_name = 'product/create.html'
    success_url = reverse_lazy('erp:product_list')

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
        context['title'] = 'Editar Producto'
        context['entity'] = 'Productos'
        context['list_url'] = reverse_lazy('erp:product_list')
        context['action'] = 'edit'
        return context


# --- ELIMINAR ---
class ProductDeleteView(DeleteView):
    model = Product
    template_name = 'product/delete.html'
    success_url = reverse_lazy('erp:product_list')

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
        context['title'] = 'Eliminar Producto'
        context['entity'] = 'Productos'
        context['list_url'] = reverse_lazy('erp:product_list')
        return context


# --- FORM VIEW (opcional) ---
class ProductFormView(FormView):
    form_class = ProductForm
    template_name = 'product/create.html'
    success_url = reverse_lazy('erp:product_list')

    def form_valid(self, form):
        print(form.is_valid())
        print(form.errors)
        return super().form_valid(form)

    def form_invalid(self, form):
        print(form.is_valid())
        print(form)
        return super().form_invalid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Formulario de Producto'
        context['entity'] = 'Productos'
        context['list_url'] = reverse_lazy('erp:product_list')
        context['action'] = 'add'
        return context
