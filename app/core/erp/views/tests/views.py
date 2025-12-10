
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

from core.erp.models import Category, Product
from core.forms import TestForm

class TestView(TemplateView):
    template_name = 'tests.html'

    @method_decorator(csrf_exempt)
    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']

            if action == 'search_product_id':
                # Aquí iría tu lógica para buscar productos
                pass

            elif action == 'autocomplete':
                data = []
                for i in Category.objects.filter(name__icontains=request.POST['term'])[0:10]:
                    item = i.toJSON()
                    item['text'] = i.name
                    data.append(item)

            else:
                data['error'] = 'Ha ocurrido un error'

        except Exception as e:
            data['error'] = str(e)

        return JsonResponse(data, safe=False)



    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Select Anidados | Django'
        context['form'] = TestForm()
        return context