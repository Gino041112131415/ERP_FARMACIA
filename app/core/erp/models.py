from django.db import models
from datetime import datetime

from django.forms import model_to_dict
from core.erp.choices import gender_choices

# ==============================
#  CLIENT
# ==============================
class Client(models.Model):
    names = models.CharField(max_length=150, verbose_name="Nombres")
    surnames = models.CharField(max_length=150, verbose_name="Apellidos")
    dni = models.CharField(max_length=10, unique=True, verbose_name="Dni")
    birthday = models.DateField(default=datetime.now,  verbose_name="Fecha de Nacimiento")
    address = models.CharField(max_length=250, null=True, blank=True, verbose_name="Dirección")
    sexo = models.CharField(max_length=10, choices=gender_choices, default='male', verbose_name="Sexo")

    def __str__(self):
        return self.names 
    
    

    class Meta:
        verbose_name = "Client"
        verbose_name_plural = "Clientes"
        ordering = ["id"]


# ==============================
#  CATEGORY
# ==============================
class Category(models.Model):
    name = models.CharField(max_length=150, verbose_name="Nombre", unique=True)
    desc = models.CharField(max_length=500, null=True, blank=True, verbose_name="Descripción")

    def __str__(self):
        return self.name
    
    def toJSON(self):
        item = model_to_dict(self, exclude=[''])
        return item

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        ordering = ["id"]


# ==============================
#  PRODUCT
# ==============================
class Product(models.Model):
    cate = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=150, verbose_name="Nombre", unique=True)
    image = models.ImageField(upload_to="products/%Y/%m/%d", null=True, blank=True)
    pvp = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    stock = models.PositiveIntegerField(default=0, verbose_name="Stock")  # 👈 Nuevo campo
 
    def __str__(self):
        return self.name
    
    def toJSON(self):
        item = model_to_dict(self)
        item['cate'] = self.cate.toJSON()
        if self.image:
            item['image'] = self.image.url
        else:
            # Imagen genérica por defecto
            from django.templatetags.static import static
            item['image'] = static('img/sin_fotos.png')
        return item
 

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ["id"]


# ==============================
#  SALE
# ==============================
class Sale(models.Model):
    cli = models.ForeignKey(Client, on_delete=models.CASCADE)
    date_joined = models.DateField(default=datetime.now)
    subtotal = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    iva = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    total = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)

    def __str__(self):
        return self.cli.names

    class Meta:
        verbose_name = "Venta"
        verbose_name_plural = "Ventas"
        ordering = ["id"]


# ==============================
#  DETAIL SALE
# ==============================
class DetSale(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE)
    prod = models.ForeignKey(Product, on_delete=models.CASCADE)
    cant = models.IntegerField(default=0)
    price = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    subtotal = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)

    def __str__(self):
        return self.prod.name

    class Meta:
        verbose_name = "detalle de venta"
        verbose_name_plural = "detalles de ventas"
        ordering = ["id"]
