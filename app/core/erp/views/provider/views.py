from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from core.erp.models import Provider
from core.forms import ProviderForm


class ProviderListView(ListView):
    model = Provider
    template_name = "provider/list.html"

    @method_decorator(csrf_exempt)
    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        action = request.POST.get("action")
        data = []

        if action == "searchdata":
            for p in Provider.objects.all():
                item = p.toJSON()
                item["id"] = p.id
                data.append(item)
        else:
            data = {"error": "Acción no válida"}

        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx["title"] = "Listado de Proveedores"
        ctx["entity"] = "Proveedores"
        ctx["create_url"] = reverse_lazy("erp:provider_create")
        ctx["list_url"] = reverse_lazy("erp:provider_list")
        ctx["form"] = ProviderForm()
        return ctx


class ProviderCreateView(CreateView):
    model = Provider
    form_class = ProviderForm

    def post(self, request, *args, **kwargs):
        form = ProviderForm(request.POST)
        return JsonResponse(form.save())


class ProviderUpdateView(UpdateView):
    model = Provider
    form_class = ProviderForm

    def post(self, request, *args, **kwargs):
        form = ProviderForm(request.POST, instance=self.get_object())
        return JsonResponse(form.save())


class ProviderDeleteView(DeleteView):
    model = Provider
    template_name = "provider/delete.html"
    success_url = reverse_lazy("erp:provider_list")

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            self.object = self.get_object()
            self.object.delete()
            return JsonResponse({"success": True})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


