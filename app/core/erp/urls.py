
from django.urls import path
from core.erp.views.product.views import ProductCreateView, ProductDeleteView, ProductFormView, ProductListView, ProductUpdateView, product_list
from core.erp.views.dashboard.views import DashboardView
from core.erp.views.category.views import CategoryCreateView, CategoryDeleteView, CategoryFormView, CategoryListView, CategoryUpdateView, category_list as Category_list
app_name = 'erp'
urlpatterns = [
  path('category/list/', CategoryListView.as_view(), name='category_list'),
  path('category/list2/', Category_list, name='category_list2'),
  path('category/add/', CategoryCreateView.as_view(), name='category_create'),  
  path('category/update/<int:pk>/', CategoryUpdateView.as_view(), name='category_update'), 
  path('category/delete/<int:pk>/', CategoryDeleteView.as_view(), name='category_delete'),
  path('category/form/', CategoryFormView.as_view(), name='category_form'), 
  path('dashboard/', DashboardView.as_view(), name='dashboard'),
  
  # === PRODUCTOS === 👇 NUEVO BLOQUE
    path('product/list/', ProductListView.as_view(), name='product_list'),
    path('product/list2/', product_list, name='product_list2'),
    path('product/add/', ProductCreateView.as_view(), name='product_create'),
    path('product/update/<int:pk>/', ProductUpdateView.as_view(), name='product_update'),
    path('product/delete/<int:pk>/', ProductDeleteView.as_view(), name='product_delete'),
    path('product/form/', ProductFormView.as_view(), name='product_form'),
]

