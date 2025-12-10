$(function () {

    // ===============================
    //  TABLA PRINCIPAL DE COMPRAS
    // ===============================
    let table = $("#data").DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        ajax: {
            url: window.location.pathname,
            type: "POST",
            data: { action: "list" },
            dataSrc: ""
        },
        columns: [
            { data: "id" },
            { data: "provider.company" },
            { data: "date" },
            { data: "status_display" },
            { data: null }
        ],
        columnDefs: [
            {
                targets: 0,
                className: "text-center",
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {
                targets: 4,
                className: "text-center",
                orderable: false,
                render: function (data, type, row) {

                    // Botón aceptar / recibido
                    let acceptBtn = `
                        <button class="btn btn-success btn-sm btn-accept" 
                                title="Marcar como recibida">
                            <i class="fas fa-check"></i>
                        </button>
                    `;

                    if (row.status === "received") {
                        acceptBtn = `
                            <button class="btn btn-secondary btn-sm" disabled
                                    title="Compra ya recibida">
                                <i class="fas fa-check"></i>
                            </button>
                        `;
                    }

                    // Botón ver detalle (modal)
                    let detailBtn = `
                        <button class="btn btn-info btn-sm btn-detail"
                                title="Ver productos de la compra">
                            <i class="fas fa-search"></i>
                        </button>
                    `;

                    // Botón eliminar
                    let deleteBtn = `
                        <button class="btn btn-danger btn-sm btn-delete" 
                                title="Eliminar compra">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;

                    return `
                        <div class="btn-group">
                            ${acceptBtn}
                            ${detailBtn}
                            ${deleteBtn}
                        </div>
                    `;
                }
            }
        ]
    });

    // ========================
    // ACEPTAR COMPRA
    // ========================
    $("#data tbody").on("click", ".btn-accept", function () {
        let data = table.row($(this).parents("tr")).data();

        Swal.fire({
            title: "¿Aceptar esta compra?",
            text: "Esto sumará el stock a los productos.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, continuar"
        }).then(result => {
            if (result.isConfirmed) {
                $.ajax({
                    url: window.location.pathname,
                    type: "POST",
                    data: {
                        action: "accept",
                        id: data.id
                    },
                    success: function (resp) {
                        if (!resp.error) {
                            Swal.fire("Correcto", resp.success, "success");
                            table.ajax.reload(null, false);
                        } else {
                            message_error(resp.error);
                        }
                    }
                });
            }
        });

    });

    // ========================
    // ELIMINAR COMPRA
    // ========================
    $("#data tbody").on("click", ".btn-delete", function () {
        let data = table.row($(this).parents("tr")).data();

        Swal.fire({
            title: "¿Eliminar compra?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar"
        }).then(result => {
            if (result.isConfirmed) {
                $.ajax({
                    url: window.location.pathname,
                    type: "POST",
                    data: {
                        action: "delete",
                        id: data.id
                    },
                    success: function (resp) {
                        if (!resp.error) {
                            Swal.fire("Correcto", resp.success, "success");
                            table.ajax.reload(null, false);
                        } else {
                            message_error(resp.error);
                        }
                    }
                });
            }
        });
    });


    // ============================================
    //  DETALLE DE PRODUCTOS (MODAL)
    // ============================================
    let detailTable = null;

    $("#data tbody").on("click", ".btn-detail", function () {

        let data = table.row($(this).parents("tr")).data();
        let purchase_id = data.id;

        // Abre el modal
        $("#modalDetail").modal("show");

        // Si ya existe un DataTable anterior lo destruimos
        if ($.fn.DataTable.isDataTable("#tblDetail")) {
            $("#tblDetail").DataTable().clear().destroy();
        }

        // Cargamos el detalle con AJAX + DataTable
        detailTable = $("#tblDetail").DataTable({
            responsive: true,
            autoWidth: false,
            destroy: true,
            searching: false,
            lengthChange: false,
            info: false,
            paging: false,
            ajax: {
                url: window.location.pathname,
                type: "POST",
                data: {
                    action: "detail",
                    id: purchase_id
                },
                dataSrc: ""
            },
            columns: [
                { data: "product" },
                { data: "category" },
                { data: "quantity" },
                { data: "purchase_price" },
                { data: "expiration_date" },
                { data: "subtotal" },
                { data: null }
            ],
            columnDefs: [
                {
                    targets: 3,
                    className: "text-right",
                    render: function (data) {
                        return "S/ " + parseFloat(data).toFixed(2);
                    }
                },
                {
                    targets: 5,
                    className: "text-right",
                    render: function (data) {
                        return "S/ " + parseFloat(data).toFixed(2);
                    }
                },
                {
                    targets: 2,
                    className: "text-center"
                },
                {
                    targets: 6,
                    className: "text-center",
                    orderable: false,
                    render: function (data, type, row) {
                        return `
                            <button class="btn btn-warning btn-sm btn-edit"
                                    title="Editar detalle">
                                <i class="fas fa-edit"></i>
                            </button>
                        `;
                    }
                }
            ]
        });

    });


    // ============================================
    //  ABRIR MODAL DE EDICIÓN DE DETALLE
    // ============================================
    $("#tblDetail tbody").on("click", ".btn-edit", function () {

        if (!detailTable) return;

        let rowData = detailTable.row($(this).parents("tr")).data();

        $("#det_id").val(rowData.id);
        $("#edit_purchase_price").val(rowData.purchase_price);
        $("#edit_expiration_date").val(rowData.expiration_date || "");

        $("#modalEditDetail").modal("show");
    });


    // ============================================
    //  GUARDAR CAMBIOS DEL DETALLE
    // ============================================
    $("#btnSaveDetail").on("click", function () {

        let det_id = $("#det_id").val();
        let price = $("#edit_purchase_price").val();
        let exp = $("#edit_expiration_date").val();

        if (!price) {
            message_error("Debes ingresar un precio de compra.");
            return;
        }

        $.ajax({
            url: window.location.pathname,
            type: "POST",
            data: {
                action: "update_detail",
                det_id: det_id,
                purchase_price: price,
                expiration_date: exp
            },
            success: function (resp) {
                if (!resp.error) {
                    Swal.fire("Correcto", resp.success, "success");
                    $("#modalEditDetail").modal("hide");

                    if (detailTable) {
                        detailTable.ajax.reload(null, false);
                    }
                    // Opcional: refrescar encabezado por si cambia algo en la compra
                    table.ajax.reload(null, false);
                } else {
                    message_error(resp.error);
                }
            }
        });

    });

});
