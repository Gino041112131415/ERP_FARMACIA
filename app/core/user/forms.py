# core/user/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from core.user.models import User


class UserCreateForm(UserCreationForm):
    """Formulario para CREAR usuarios (incluye password1 + password2)."""

    password1 = forms.CharField(
        label='Contraseña',
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Contraseña',
            'autocomplete': 'new-password',
        })
    )
    password2 = forms.CharField(
        label='Repetir contraseña',
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Repite la contraseña',
            'autocomplete': 'new-password',
        })
    )

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'username',
            'email',
            'image',
            'is_active',
            'is_staff',
        ]
        widgets = {
            'first_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nombres'
            }),
            'last_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Apellidos'
            }),
            'username': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Usuario'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Correo'
            }),
            'image': forms.ClearableFileInput(attrs={
                'class': 'form-control-file'
            }),
            'is_active': forms.CheckboxInput(attrs={
                'class': 'form-check-input'
            }),
            'is_staff': forms.CheckboxInput(attrs={
                'class': 'form-check-input'
            }),
        }


class UserUpdateForm(UserChangeForm):
    """Formulario para EDITAR usuarios (no toca la contraseña)."""

    password = None  # ocultamos el campo password

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'username',
            'email',
            'image',
            'is_active',
            'is_staff',
        ]
        widgets = {
            'first_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nombres'
            }),
            'last_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Apellidos'
            }),
            'username': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Usuario'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Correo'
            }),
            'image': forms.ClearableFileInput(attrs={
                'class': 'form-control-file'
            }),
            'is_active': forms.CheckboxInput(attrs={
                'class': 'form-check-input'
            }),
            'is_staff': forms.CheckboxInput(attrs={
                'class': 'form-check-input'
            }),
        }
