from django.forms import Form, CharField
from django.forms import TextInput
from django.utils.translation import gettext_lazy as _


class ReportForm(Form):
    date_range = CharField(widget=TextInput(attrs={
        'class': 'form-control',
        'autocomplete': 'off'
    }))
