import os
import sys
import django

# === 🔧 CONFIGURAR RUTA BASE DEL PROYECTO ===
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

# === ⚙️ CONFIGURAR ENTORNO DJANGO ===
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()  # 💡 Esto inicializa Django correctamente

# === 📦 IMPORTAR MODELOS ===
from core.erp.models import Type

# === 🧱 CREAR UN REGISTRO DE PRUEBA ===
t = Type()
t.name = "Administrador"
t.save()

print("✅ Registro creado correctamente:", t.name)



