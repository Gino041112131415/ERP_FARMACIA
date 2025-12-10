from django.urls import path

from core.erp.views.client.views import (
    ClientListView, ClientCreateView, ClientUpdateView, ClientDeleteView
)
from core.erp.views.tests.views import TestView
from core.erp.views.product.views import (
    ProductCreateView, ProductDeleteView, ProductFormView,
    ProductListView, ProductUpdateView, product_list
)
from core.erp.views.dashboard.views import DashboardView
from core.erp.views.category.views import (
    CategoryCreateView, CategoryDeleteView, CategoryFormView,
    CategoryListView, CategoryUpdateView, category_list as Category_list
)
from core.erp.views.sale.views import SaleCreateView, SaleInvoicePdfView, SaleListView
from core.erp.views.provider.views import ProviderListView, ProviderCreateView, ProviderUpdateView, ProviderDeleteView
from core.erp.views.machine_learning.views import MLDashboardView

# IMPORTANTE: VISTAS DE COMPRAS
from core.erp.views.purchase.views import (
    PurchaseCreateView,
    PurchaseProductsView,
    PurchaseListView,
)
from core.erp.views.inventory.views import InventoryMovementListView



app_name = 'erp'

urlpatterns = [

    # ============================
    # CATEGORY
    # ============================
    path('category/list/', CategoryListView.as_view(), name='category_list'),
    path('category/list2/', Category_list, name='category_list2'),
    path('category/add/', CategoryCreateView.as_view(), name='category_create'),
    path('category/update/<int:pk>/', CategoryUpdateView.as_view(), name='category_update'),
    path('category/delete/<int:pk>/', CategoryDeleteView.as_view(), name='category_delete'),
    path('category/form/', CategoryFormView.as_view(), name='category_form'),

    # ============================
    # DASHBOARD
    # ============================
    path('dashboard/', DashboardView.as_view(), name='dashboard'),

    # ============================
    # PRODUCTS
    # ============================
    path('product/list/', ProductListView.as_view(), name='product_list'),
    path('product/list2/', product_list, name='product_list2'),
    path('product/add/', ProductCreateView.as_view(), name='product_create'),
    path('product/update/<int:pk>/', ProductUpdateView.as_view(), name='product_update'),
    path('product/delete/<int:pk>/', ProductDeleteView.as_view(), name='product_delete'),
    path('product/form/', ProductFormView.as_view(), name='product_form'),

    # ============================
    # CLIENT
    # ============================
    path('client/list/', ClientListView.as_view(), name='client_list'),
    path('client/add/', ClientCreateView.as_view(), name='client_create'),
    path('client/update/<int:pk>/', ClientUpdateView.as_view(), name='client_update'),
    path('client/delete/<int:pk>/', ClientDeleteView.as_view(), name='client_delete'),

    # ============================
    # TEST VIEW
    # ============================
    path('tests/', TestView.as_view(), name='tests'),

    # ============================
    # SALES
    # ============================
    path('sale/add/', SaleCreateView.as_view(), name='sale_create'),
    path('sale/list/', SaleListView.as_view(), name='sale_list'),
    path('sale/invoice/pdf/<int:pk>/', SaleInvoicePdfView.as_view(), name='sale_invoice_pdf'),

    # ============================
    # PROVIDERS
    # ============================
    path('provider/list/', ProviderListView.as_view(), name='provider_list'),
    path('provider/add/', ProviderCreateView.as_view(), name='provider_create'),
    path('provider/update/<int:pk>/', ProviderUpdateView.as_view(), name='provider_update'),
    path('provider/delete/<int:pk>/', ProviderDeleteView.as_view(), name='provider_delete'),

    # ============================
    # MACHINE LEARNING
    # ============================
    path('ml/dashboard/', MLDashboardView.as_view(), name='ml_dashboard'),

    # ============================
    # PURCHASES (COMPRAS)
    # ============================
    path('purchase/add/', PurchaseCreateView.as_view(), name='purchase_create'),
    path('purchase/<int:pk>/products/', PurchaseProductsView.as_view(), name='purchase_products'),
    path('purchase/list/', PurchaseListView.as_view(), name='purchase_list'),
    
    path('inventory/movements/', InventoryMovementListView.as_view(), name='inventory_movement_list'),
]

