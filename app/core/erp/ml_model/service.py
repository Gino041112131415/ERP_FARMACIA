import os
import pandas as pd
import joblib
from django.conf import settings


BASE_DIR = settings.BASE_DIR
ML_DIR = os.path.join(BASE_DIR, "core", "erp", "ml_model")

PATH_MODEL        = os.path.join(ML_DIR, "rf_model.pkl")
PATH_LE_PRODUCT   = os.path.join(ML_DIR, "le_product.pkl")
PATH_LE_CATEGORY  = os.path.join(ML_DIR, "le_category.pkl")
PATH_LE_SUPPLIER  = os.path.join(ML_DIR, "le_supplier.pkl")
PATH_FEATURE_COLS = os.path.join(ML_DIR, "feature_cols.pkl")
PATH_DATASET      = os.path.join(ML_DIR, "farmacia_pyme_2024_12prod.csv")

print(" modelo ML")

model = joblib.load(PATH_MODEL)
le_product   = joblib.load(PATH_LE_PRODUCT)
le_category  = joblib.load(PATH_LE_CATEGORY)
le_supplier  = joblib.load(PATH_LE_SUPPLIER)
feature_cols = joblib.load(PATH_FEATURE_COLS)

df = pd.read_csv(PATH_DATASET, parse_dates=["date"]).sort_values("date")

df["product_id_enc"] = le_product.transform(df["product_id"])
df["category_enc"]   = le_category.transform(df["category"])
df["supplier_enc"]   = le_supplier.transform(df["supplier"])

print("Modelo y data cargados correctamente.")



# FUNCIÓN DE PREDICCIÓN DIARIA

def predecir_demanda(product_code: str, dias_futuros: int = 7):

    df_prod = df[df["product_id"] == product_code].copy()
    if df_prod.empty:
        raise ValueError(f"❌ El producto '{product_code}' no existe en el dataset.")

    df_prod = df_prod.sort_values("date")

    df_prod["year"] = df_prod["date"].dt.year
    df_prod["month"] = df_prod["date"].dt.month
    df_prod["dayofweek"] = df_prod["date"].dt.dayofweek

    # lags + rolling
    df_prod["lag_1"] = df_prod["sales_units"].shift(1)
    df_prod["lag_7"] = df_prod["sales_units"].shift(7)
    df_prod["rolling_7"]  = df_prod["sales_units"].rolling(7).mean()
    df_prod["rolling_14"] = df_prod["sales_units"].rolling(14).mean()

    df_prod["lag_1"].fillna(df_prod["sales_units"], inplace=True)
    df_prod["lag_7"].fillna(df_prod["sales_units"], inplace=True)
    df_prod["rolling_7"].fillna(df_prod["sales_units"], inplace=True)
    df_prod["rolling_14"].fillna(df_prod["sales_units"], inplace=True)

    # encodings
    df_prod["product_id_enc"] = le_product.transform(df_prod["product_id"])
    df_prod["category_enc"]   = le_category.transform(df_prod["category"])
    df_prod["supplier_enc"]   = le_supplier.transform(df_prod["supplier"])

    # última fila
    ult_fila = df_prod.iloc[-1].copy()

    resultados = []

    for _ in range(dias_futuros):

        nueva_fecha = ult_fila["date"] + pd.Timedelta(days=1)

        new_row = {
            "product_id_enc": int(ult_fila["product_id_enc"]),
            "category_enc":   int(ult_fila["category_enc"]),
            "supplier_enc":   int(ult_fila["supplier_enc"]),
            "lead_time_days": ult_fila["lead_time_days"],
            "reorder_point":  ult_fila["reorder_point"],
            "promotion":      ult_fila["promotion"],
            "price":          ult_fila["price"],
            "stock_available": ult_fila["stock_available"],
            "year": nueva_fecha.year,
            "month": nueva_fecha.month,
            "dayofweek": nueva_fecha.dayofweek,
            "lag_1": ult_fila["sales_units"],
            "lag_7": ult_fila["lag_1"],
            "rolling_7": ult_fila["rolling_7"],
            "rolling_14": ult_fila["rolling_14"],
        }

        X_new = pd.DataFrame([new_row])[feature_cols]
        pred = model.predict(X_new)[0]

        resultados.append({
            "date": nueva_fecha,
            "product_id": product_code,
            "predicted_sales_units": float(pred)
        })

        # actualizar
        ult_fila["date"] = nueva_fecha
        ult_fila["sales_units"] = pred
        ult_fila["lag_1"] = pred

    return pd.DataFrame(resultados)


# ============================================
#   FUNCIÓN: IDI (Duración de Inventario)
# ============================================

def calcular_idi(product_code: str, dias_futuros: int = 15):
    """
    Retorna historial de IDI + Proyección ML de IDI.
    IDI = stock / ventas_promedio
    """

    df_prod = df[df["product_id"] == product_code].copy()
    if df_prod.empty:
        raise ValueError("Producto no encontrado")

    # IDI histórico
    df_prod["idi"] = df_prod["stock_available"] / df_prod["sales_units"].replace(0, 0.1)

    # IDI futuro con ML
    df_pred = predecir_demanda(product_code, dias_futuros)
    stock_actual = df_prod.iloc[-1]["stock_available"]

    idi_futuro = []
    s = stock_actual

    for venta in df_pred["predicted_sales_units"]:
        if venta <= 0:
            venta = 0.1
        idi_futuro.append(s / venta)
        s -= venta

    df_pred["idi_future"] = idi_futuro

    return df_prod.tail(30), df_pred
