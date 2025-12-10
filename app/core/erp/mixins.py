from datetime import datetime
from django.contrib import messages      # ✅ ESTE es el correcto
from django.shortcuts import redirect
from django.urls import reverse_lazy


class IsSuperuserMixin(object):

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_superuser:
            return super().dispatch(request, *args, **kwargs)
        return redirect('Login')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['date_now'] = datetime.now()
        return context


class validarPermisos(object):
    permission_required = ''
    url_redirect = None

    def get_perms(self):
        if isinstance(self.permission_required, str):
            perms = (self.permission_required,)
        else:
            perms = self.permission_required
        return perms

    def get_url_redirect(self):
        if self.url_redirect is None:
            # Ojo con el nombre de tu url de login ('login' o 'Login')
            return reverse_lazy('login')
        return self.url_redirect

    def dispatch(self, request, *args, **kwargs):
        # Si tiene los permisos necesarios, sigue normal
        if request.user.has_perms(self.get_perms()):
            return super().dispatch(request, *args, **kwargs)

        # Si NO tiene permisos, mostramos mensaje y redirigimos
        messages.error(request, 'No tienes permisos para ingresar a esta sección.')
        return redirect(self.get_url_redirect())
