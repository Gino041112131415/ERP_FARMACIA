import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# -------------------------------
# Configuración para PostgreSQL
# -------------------------------
POSTGRESQL = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'db',          # nombre exacto de tu base de datos
        'USER': 'postgres',    # usuario (sin tildes)
        'PASSWORD': '123',     # contraseña (solo letras/números, sin acentos)
        'HOST': 'localhost',
        'PORT': '5432',
        'OPTIONS': {
            'client_encoding': 'UTF8',
        },
    }
}

# -------------------------------
# Configuración opcional para SQLite (solo desarrollo)
# -------------------------------
SQLITE = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

