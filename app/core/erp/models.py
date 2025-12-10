from django.db import models
from datetime import datetime
from django.templatetags.static import static
from django.forms import model_to_dict
from core.erp.choices import gender_choices
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver      

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
    
    def toJSON(self):
        from django.forms import model_to_dict
        item = model_to_dict(self)
        return item

    
    

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
    stock = models.PositiveIntegerField(default=0, verbose_name="Stock")  
 
    def __str__(self):
        return self.name
    
    def toJSON(self):
        item = model_to_dict(self)
        item['cate'] = self.cate.toJSON()

        if self.image:
            item['image'] = self.image.url
        else:
            item['image'] = static('img/sin_fotos.png')

        item['pvp'] = format(self.pvp, '.2f')

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
    date_joined = models.DateTimeField(default=datetime.now)
    subtotal = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    iva = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    total = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)

    def __str__(self):
        return self.cli.names
    
    def toJSON(self):
        item = model_to_dict(self)
        item['cli'] = self.cli.toJSON()
        item['date_joined'] = self.date_joined.strftime('%Y-%m-%d')
        item['subtotal'] = float(self.subtotal)
        item['iva'] = float(self.iva)
        item['total'] = float(self.total)
        return item


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
    
    def toJSON(self):
        item = model_to_dict(self)
        item['prod'] = self.prod.toJSON()
        item['price'] = float(self.price)
        item['subtotal'] = float(self.subtotal)
        return item        
    

    class Meta:
        verbose_name = "detalle de venta"
        verbose_name_plural = "detalles de ventas"
        ordering = ["id"]


# ==============================
#  PROVIDER 
# ==============================

class Provider(models.Model):
    company = models.CharField(max_length=150, verbose_name="Empresa")
    address = models.CharField(max_length=250, verbose_name="Dirección")
    contact_name = models.CharField(max_length=150, verbose_name="Nombre")
    phone = models.CharField(max_length=30, verbose_name="Teléfono")
    email = models.EmailField(verbose_name="Email")

    def __str__(self):
        return self.company

    def toJSON(self):
        return model_to_dict(self)

    class Meta:
        verbose_name = "Proveedor"
        verbose_name_plural = "Proveedores"
        ordering = ["id"]



PURCHASE_STATUS = (
    ('pending', 'Pendiente'),
    ('received', 'Recibida'),
)

class Purchase(models.Model):
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, verbose_name="Proveedor")
    date = models.DateField(default=datetime.now, verbose_name="Fecha de compra")
    observations = models.CharField(max_length=250, null=True, blank=True, verbose_name="Observaciones")
    status = models.CharField(max_length=10, choices=PURCHASE_STATUS, default='pending', verbose_name="Estado")

    def __str__(self):
        return f"Compra #{self.id} - {self.provider.company}"

    def toJSON(self):
        item = model_to_dict(self)
        item['provider'] = self.provider.toJSON()
        item['date'] = self.date.strftime('%Y-%m-%d')
        item['status_display'] = self.get_status_display()
        return item

    class Meta:
        verbose_name = "Compra"
        verbose_name_plural = "Compras"
        ordering = ["id"]


# =====================================================
#  DETAIL PURCHASE
# =====================================================
class DetPurchase(models.Model):
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    prod = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0, verbose_name="Cantidad")
    purchase_price = models.DecimalField(default=0.00, max_digits=9, decimal_places=2, verbose_name="Precio compra")
    sale_price = models.DecimalField(default=0.00, max_digits=9, decimal_places=2, verbose_name="Precio venta")
    expiration_date = models.DateField(null=True, blank=True, verbose_name="Fecha vencimiento")
    subtotal = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)

    def __str__(self):
        return f"{self.prod.name} ({self.quantity})"

    def toJSON(self):
        item = model_to_dict(self)
        item['prod'] = self.prod.toJSON()
        item['purchase_price'] = float(self.purchase_price)
        item['sale_price'] = float(self.sale_price)
        item['subtotal'] = float(self.subtotal)
        item['expiration_date'] = (
            self.expiration_date.strftime('%Y-%m-%d') if self.expiration_date else ''
        )
        return item

    class Meta:
        verbose_name = "Detalle de compra"
        verbose_name_plural = "Detalles de compras"
        ordering = ["id"]



# ==============================
#  INVENTORY MOVEMENT
# ==============================
MOVEMENT_TYPE = (
    ('IN', 'Entrada'),
    ('OUT', 'Salida'),
)


class InventoryMovement(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name="Producto")
    date = models.DateTimeField(default=datetime.now, verbose_name="Fecha")
    movement_type = models.CharField(max_length=3, choices=MOVEMENT_TYPE, verbose_name="Tipo")
    quantity = models.IntegerField(verbose_name="Cantidad")

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Usuario"
    )

    reference = models.CharField(
        max_length=150,
        null=True,
        blank=True,
        verbose_name="Referencia (Compra/Venta)"
    )

    stock_before = models.IntegerField(null=True, blank=True, verbose_name="Stock antes")
    stock_after = models.IntegerField(null=True, blank=True, verbose_name="Stock después")

    def __str__(self):
        return f"{self.get_movement_type_display()} - {self.product.name} ({self.quantity})"

    def toJSON(self):
        """
        Se adapta a los nombres que usa DataTables:
        - date
        - type          (IN / OUT)
        - type_display  (Entrada / Salida)
        - product_name
        - quantity
        - user_name
        - origin
        - notes
        """
        item = {}
        item['id'] = self.id
        item['date'] = self.date.strftime('%Y-%m-%d %H:%M')
        item['type'] = self.movement_type
        item['type_display'] = self.get_movement_type_display()
        item['product_name'] = self.product.name
        item['quantity'] = self.quantity

        if self.user:
            item['user_name'] = self.user.get_full_name() or self.user.username
        else:
            item['user_name'] = ''

        item['origin'] = self.reference or ''
        item['notes'] = ''   # por ahora vacío
        return item

    class Meta:
        verbose_name = "Movimiento de inventario"
        verbose_name_plural = "Movimientos de inventario"
        ordering = ["-date", "-id"]
