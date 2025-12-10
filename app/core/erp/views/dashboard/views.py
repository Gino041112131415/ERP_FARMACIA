# core/erp/views/dashboard.py

from datetime import datetime, timedelta
from django.views.generic import TemplateView
from django.db.models import Sum, IntegerField, Case, When
# ya no usamos ExtractMonth

from core.erp.models import (
    Sale, DetSale,
    DetPurchase,
    Product,
)


class DashboardView(TemplateView):
    template_name = 'dashboard.html'

    # =============================
    # 1) Ventas mensuales (S/)
    # =============================
    def get_graph_sales_year_month(self):
        data = []
        try:
            year = datetime.now().year
            for month in range(1, 13):
                agg = (
                    Sale.objects
                    .filter(date_joined__year=year, date_joined__month=month)
                    .aggregate(total_sum=Sum('total'))
                )
                total = agg['total_sum'] or 0
                data.append(float(total))
        except Exception:
            data = []
        return data

    # =============================
    # 2) Top productos más vendidos
    # =============================
    def get_top_products(self):
        try:
            qs = (
                DetSale.objects
                .values('prod__name')
                .annotate(total=Sum('cant'))
                .order_by('-total')[:5]
            )
            return [{'name': row['prod__name'], 'y': row['total']} for row in qs]
        except Exception:
            return []

    # =============================
    # 3) Productos próximos a vencer (30, 60, 90 días)
    # =============================
    def get_products_near_expiration(self):
        """
        Devuelve un diccionario con:
        - categories: lista de nombres de productos
        - series:
            - le_30   -> cantidad que vence en ≤30 días
            - d31_60  -> cantidad que vence entre 31 y 60 días
            - d61_90  -> cantidad que vence entre 61 y 90 días
        Solo se consideran registros con fecha de vencimiento
        entre HOY y HOY + 90 días.
        """
        data = {
            'categories': [],
            'series': {
                'le_30': [],
                'd31_60': [],
                'd61_90': [],
            }
        }

        today = datetime.now().date()
        d30 = today + timedelta(days=30)
        d60 = today + timedelta(days=60)
        d90 = today + timedelta(days=90)

        try:
            qs = (
                DetPurchase.objects
                .filter(
                    expiration_date__isnull=False,
                    expiration_date__gte=today,
                    expiration_date__lte=d90
                )
                .values('prod__name')
                .annotate(
                    qty_30=Sum(
                        Case(
                            When(expiration_date__lte=d30, then='quantity'),
                            default=0,
                            output_field=IntegerField(),
                        )
                    ),
                    qty_60=Sum(
                        Case(
                            When(expiration_date__gt=d30, expiration_date__lte=d60, then='quantity'),
                            default=0,
                            output_field=IntegerField(),
                        )
                    ),
                    qty_90=Sum(
                        Case(
                            When(expiration_date__gt=d60, expiration_date__lte=d90, then='quantity'),
                            default=0,
                            output_field=IntegerField(),
                        )
                    ),
                )
            )

            for row in qs:
                data['categories'].append(row['prod__name'])
                data['series']['le_30'].append(row['qty_30'] or 0)
                data['series']['d31_60'].append(row['qty_60'] or 0)
                data['series']['d61_90'].append(row['qty_90'] or 0)

        except Exception:
            # si algo falla, devolvemos estructura vacía
            pass

        return data

    # =============================
    # 4) Stock actual
    # =============================
    def get_stock_products(self):
        try:
            qs = Product.objects.values('name', 'stock')
            return {
                'categories': [p['name'] for p in qs],
                'data': [p['stock'] for p in qs]
            }
        except Exception:
            return {'categories': [], 'data': []}

    # =============================
    # 5) 🔥 STOCK BAJO para alerta
    # =============================
    def get_low_stock(self):
        try:
            prods = Product.objects.filter(stock__lte=10)
            return [{"name": p.name, "stock": p.stock} for p in prods]
        except Exception:
            return []

    # =============================
    # CONTEXTO DEL DASHBOARD
    # =============================
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['panel'] = 'Panel de administrador'
        context['graph_sales_year_month'] = self.get_graph_sales_year_month()
        context['top_products'] = self.get_top_products()
        context['near_expiration'] = self.get_products_near_expiration()  # 👈 NUEVO
        context['stock_products'] = self.get_stock_products()
        context['low_stock'] = self.get_low_stock()

        return context
