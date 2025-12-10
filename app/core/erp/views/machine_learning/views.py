from django.views.generic import TemplateView
import json
from core.erp.ml_model.service import (
    df,
    calcular_idi
)
from core.erp.ml_model.service import predecir_demanda as predecir_demanda_30dias

class MLDashboardView(TemplateView):
    template_name = "ml_dashboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # Producto seleccionado por el combobox
        product_id = self.request.GET.get("product_id", "MED001")

        # Lista de productos
        productos = df[["product_id", "product_name"]].drop_duplicates()
        context["products"] = productos.to_dict("records")

        # === Grafico 1: predicción ventas 30 días ===
        df_daily = predecir_demanda_30dias(product_id, 30)

        # === Grafico 2: IDI real y proyectado ===
        df_hist, df_future = calcular_idi(product_id, 15)

        context.update({
            # Grafico 1
            "product_id": product_id,
            "dates": json.dumps(df_daily["date"].dt.strftime("%Y-%m-%d").tolist()),
            "values": json.dumps(df_daily["predicted_sales_units"].tolist()),

            # Grafico 2
            "idi_hist_dates": json.dumps(df_hist["date"].dt.strftime("%Y-%m-%d").tolist()),
            "idi_hist_values": json.dumps(df_hist["idi"].tolist()),
            "idi_future_dates": json.dumps(df_future["date"].dt.strftime("%Y-%m-%d").tolist()),
            "idi_future_values": json.dumps(df_future["idi_future"].tolist()),
        })

        return context



