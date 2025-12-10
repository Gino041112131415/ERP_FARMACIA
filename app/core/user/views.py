# core/user/views.py
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from core.user.models import User
from core.user.forms import UserCreateForm, UserUpdateForm


class UserListView(LoginRequiredMixin, ListView):
    model = User
    template_name = 'user/list.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        action = request.POST.get('action')

        try:
            # =======================
            # LISTAR (para DataTables)
            # =======================
            if action == 'searchdata':
                data = []
                for u in User.objects.all().order_by('id'):
                    data.append(u.toJSON())
                return JsonResponse(data, safe=False)

            # =======================
            # OBTENER UN USUARIO
            # =======================
            elif action == 'get_user':
                pk = request.POST.get('id')
                u = User.objects.get(pk=pk)
                data = u.toJSON()
                return JsonResponse(data, safe=False)

            # =======================
            # CREAR USUARIO
            # (usa UserCreateForm → password1 + password2)
            # =======================
            elif action == 'create':
                form = UserCreateForm(request.POST, request.FILES)
                if form.is_valid():
                    form.save()
                    data['success'] = 'Usuario creado correctamente.'
                else:
                    data['error'] = form.errors

            # =======================
            # ACTUALIZAR USUARIO
            # (usa UserUpdateForm → no cambia la contraseña)
            # =======================
            elif action == 'update':
                pk = request.POST.get('id')
                u = User.objects.get(pk=pk)
                form = UserUpdateForm(request.POST, request.FILES, instance=u)
                if form.is_valid():
                    form.save()
                    data['success'] = 'Usuario actualizado correctamente.'
                else:
                    data['error'] = form.errors

            # =======================
            # ELIMINAR USUARIO
            # =======================
            elif action == 'delete':
                pk = request.POST.get('id')
                u = User.objects.get(pk=pk)
                u.delete()
                data['success'] = 'Usuario eliminado correctamente.'

            else:
                data['error'] = 'Acción no válida.'
        except Exception as e:
            data['error'] = str(e)

        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Listado de Usuarios'
        context['entity'] = 'Usuarios'
        context['list_url'] = reverse_lazy('user:user_list')
        # Si quieres usar un form en el modal de creación:
        context['form_create'] = UserCreateForm()
        # Y uno base para edición (aunque en el modal normalmente llenas con JS):
        context['form_update'] = UserUpdateForm()
        return context
