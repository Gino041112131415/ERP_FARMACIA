from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import ListView , CreateView , UpdateView , DeleteView, FormView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from core.forms import CategoryForm
from core.erp.models import Category
from django.contrib.auth.decorators import login_required

# --- Vista basada en función ---
def category_list(request):
    data = {
        'title': 'Listado de Categorías',
        'categories': Category.objects.all()
    }
    return render(request, 'category/list.html', data)


# --- Vista basada en clase ---
class CategoryListView(ListView):
    model = Category
    template_name = 'category/list.html'

    # Filtro opcional (puedes quitarlo si no filtras nada)
    def get_queryset(self):
        return Category.objects.filter(name__startswith='')
    
    @method_decorator(csrf_exempt)
    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    # Maneja las solicitudes POST
    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'searchdata':
                data = []
                for i in Category.objects.all():
                    data.append(i.toJSON())
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    # Contexto adicional que se pasa a la plantilla
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de Categorías'
        context['create_url'] = reverse_lazy('erp:category_create')
        context['entity'] = 'Categorías'
        context['list_url'] = reverse_lazy('erp:category_list')
        return context


class CategoryCreateView(CreateView):
    model = Category
    form_class = CategoryForm
    template_name = 'category/create.html'
    success_url = reverse_lazy('erp:category_list')
    
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
        context['title'] = 'Crear Categoría'
        context['entity'] = 'Categorías'
        context['list_url'] = reverse_lazy('erp:category_list')
        context['action'] = 'add'
        return context
    
    
class CategoryUpdateView(UpdateView):
    model = Category
    form_class = CategoryForm
    template_name = 'category/create.html'
    success_url = reverse_lazy('erp:category_list')
    
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
        context['title'] = 'Edición  Categoría'
        context['entity'] = 'Categorías'
        context['list_url'] = reverse_lazy('erp:category_list')
        context['action'] = 'edit'
        return context

class CategoryDeleteView(DeleteView):
    model = Category
    template_name = 'category/delete.html'
    success_url = reverse_lazy('erp:category_list')
    
    @method_decorator(login_required)
      # Captura el objeto antes de procesar la petición
    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    # Maneja la solicitud POST (eliminación)
    def post(self, request, *args, **kwargs):
        data = {}
        try:
            self.object.delete()
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data)
    

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Eliminación de una Categoría'
        context['entity'] = 'Categorías'
        context['list_url'] = reverse_lazy('erp:category_list')
        return context
    

class CategoryFormView(FormView):
    form_class = CategoryForm
    template_name = 'category/create.html'
    success_url = reverse_lazy('erp:category_list')

    
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
        context['title'] = 'Form | Categoría'
        context['entity'] = 'Categorías'
        context['list_url'] = reverse_lazy('erp:category_list')
        context['action'] = 'add'
        return context
