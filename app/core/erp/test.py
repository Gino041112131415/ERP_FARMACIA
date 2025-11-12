from config.wsgi import *
from core.erp.models import Category

# 🧹 Primero limpia la tabla (opcional: elimina todo lo anterior)
Category.objects.all().delete()

# 🧾 Lista de categorías (extraídas del CSV)
data = [
    'Analgésico',
    'Antiinflamatorio',
    'Antibiótico',
    'Gastro',
    'Antialérgico',
    'Probiótico',
    'Inyectable',
    'Antitusivo',
    'Corticoide',
    'Vitaminas'
]

# 💾 Inserta cada categoría en la base de datos

for i in data:
    cat = Category(name=i)
    cat.save()
    print(f"✅ Guardado registro Nº{cat.id}: {cat.name}")

print("🎉 Carga de categorías completada correctamente.")
