from datetime import datetime
from django import forms
from django.forms import CharField, ClearableFileInput, DateInput, Form, ModelChoiceField, ModelForm, NumberInput, Select, TextInput, Textarea 
from core.erp.models import Category, Product, Sale
from django import forms
from django.forms import ModelForm, TextInput, Select
from core.erp.models import Client , Provider
from core.erp.models import Client, Provider, Purchase
from datetime import datetime
from django.forms import ModelForm, Select, Textarea, DateInput

class CategoryForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['class'] = 'form-control'
            form.field.widget.attrs['autocomplete'] = 'off'
        self.fields['name'].widget.attrs['autofocus'] = True

    class Meta:
        model = Category
        fields = '__all__'
        widgets = {
            'name': TextInput(
                attrs={'placeholder': 'Ingrese un nombre'}
            ),
            'desc': Textarea(
                attrs={
                    'placeholder': 'Ingrese una descripción',
                    'rows': 3,
                    'cols': 3
                }
            )
        }

    def save(self, commit=True):
        data = {}
        form = super()
        try:
            if form.is_valid():
                form.save()
            else:
                data['error'] = form.errors
        except Exception as e:
            data['error'] = str(e)
        return data

    def clean(self):
        cleaned = super().clean()
        name = cleaned.get('name', '')
        if len(name) <= 3:
            self.add_error('name', 'El nombre es muy corto.')
        return cleaned



class ProductForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['class'] = 'form-control'
            form.field.widget.attrs['autocomplete'] = 'off'
        self.fields['name'].widget.attrs['autofocus'] = True
    class Meta:
        model = Product
        fields = '__all__'
        widgets = {
            'name': TextInput(
                attrs={
                    'placeholder': 'Ingrese un nombre',
                }
            ),
        }
    
    def save(self, commit=True):
        data = {}
        form = super()
        try:
            if form.is_valid():
                form.save()
            else:
                data['error'] = form.errors
        except Exception as e:
            data['error'] = str(e)
        return data
       

class TestForm(Form):

    categories = ModelChoiceField(
        queryset=Category.objects.all(),
        widget=Select(attrs={
            'class': 'form-control select2'
        })
    )

    products = ModelChoiceField(
        queryset=Product.objects.none(),
        widget=Select(attrs={
            'class': 'form-control select2'
        })
    )

    search = forms.ChoiceField(
        choices=[],
        widget=forms.Select(attrs={
            'class': 'form-control select2',
            'placeholder': 'Buscar categoría'
        })
    )

    



class ClientForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs['class'] = 'form-control'
            form.field.widget.attrs['autocomplete'] = 'off'
        self.fields['names'].widget.attrs['autofocus'] = True

    class Meta:
        model = Client
        fields = '__all__'
        widgets = {
            'names': TextInput(attrs={'placeholder': 'Ingrese nombres'}),
            'surnames': TextInput(attrs={'placeholder': 'Ingrese apellidos'}),
            'dni': TextInput(attrs={'placeholder': 'Ingrese su DNI'}),
            'birthday': TextInput(attrs={'type': 'date'}),
            'address': TextInput(attrs={'placeholder': 'Ingrese su dirección'}),
            'sexo': Select()
        }

    def save(self, commit=True):
        data = {}
        form = super()
        try:
            if form.is_valid():
                form.save()
            else:
                data['error'] = form.errors
        except Exception as e:
            data['error'] = str(e)
        return data





class SaleForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Asignar form-control a todos
        for field in self.visible_fields():
            field.field.widget.attrs['class'] = 'form-control'
            field.field.widget.attrs['autocomplete'] = 'off'

        # Cliente con select2
        self.fields['cli'].widget.attrs['class'] = 'form-control select2'
        self.fields['cli'].widget.attrs['style'] = 'width: 100%'
        self.fields['cli'].widget.attrs['autofocus'] = True

        # Campos readonly
        self.fields['subtotal'].widget.attrs = {
            'readonly': True,
            'class': 'form-control text-left',
        }
        
        self.fields['total'].widget.attrs = {
            'readonly': True,
            'class': 'form-control text-left',
        }

    class Meta:
        model = Sale
        fields = '__all__'
        widgets = {

            'cli': Select(attrs={
                'class': 'form-control select2',
                'style': 'width: 100%',
            }),

            'date_joined': DateInput(
                format='%Y-%m-%dT%H:%M',
                attrs={
                    'type': 'datetime-local',
                    'class': 'form-control',
                    'value': datetime.now().strftime('%Y-%m-%dT%H:%M'),
                }
            ),
            'iva': TextInput()
        }


class ProviderForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.visible_fields():
            field.field.widget.attrs["class"] = "form-control"
            field.field.widget.attrs["autocomplete"] = "off"
        self.fields["company"].widget.attrs["autofocus"] = True

    class Meta:
        model = Provider
        fields = "__all__"
        widgets = {
            "company": TextInput(attrs={"placeholder": "Empresa"}),
            "address": TextInput(attrs={"placeholder": "Dirección"}),
            "contact_name": TextInput(attrs={"placeholder": "Nombre"}),
            "phone": TextInput(attrs={"placeholder": "Teléfono"}),
            "email": TextInput(attrs={"placeholder": "Correo"}),
        }

    def save(self, commit=True):
        data = {}
        form = super()
        try:
            if form.is_valid():
                form.save()
            else:
                data["error"] = form.errors
        except Exception as e:
            data["error"] = str(e)
        return data



class PurchaseForm(ModelForm):

    class Meta:
        model = Purchase
        fields = ['provider', 'date', 'observations']   # 👈 QUITAMOS status
        widgets = {
            'provider': Select(),
            'date': DateInput(
                format='%Y-%m-%d',
                attrs={
                    'type': 'date',
                    'class': 'form-control',
                }
            ),
            'observations': Textarea(attrs={
                'rows': 3,
                'placeholder': 'Alguna observación (opcional)...'
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Estilos generales
        for field in self.visible_fields():
            field.field.widget.attrs['class'] = 'form-control'
            field.field.widget.attrs['autocomplete'] = 'off'

        # Select2 para proveedor
        self.fields['provider'].widget.attrs['class'] = 'form-control select2'
        self.fields['provider'].widget.attrs['style'] = 'width: 100%'
        self.fields['provider'].widget.attrs['autofocus'] = True

