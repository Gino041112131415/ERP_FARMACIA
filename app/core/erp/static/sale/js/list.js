$(function () {

    // ===========================================================
    // CSRF TOKEN
    // ===========================================================
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    let csrftoken = getCookie('csrftoken');


    // ===========================================================
    // 🔥 MOSTRAR ALERTA DE STOCK BAJO AL ENTRAR AL LISTADO
    // ===========================================================
    $.ajax({
        url: window.location.pathname,
        type: 'POST',
        data: { action: 'low_stock' },
        headers: { 'X-CSRFToken': csrftoken },
        success: function (response) {

            if (response.length > 0) {
                let msg = "<b>Los siguientes productos tienen poco stock:</b><br><br>";

                response.forEach(function (p) {
                    msg += `${p.name}: <b>${p.stock}</b> unidades<br>`;
                });

                Swal.fire({
                    icon: "warning",
                    title: "¡Stock Bajo!",
                    html: msg,
                    confirmButtonText: "OK",
                });
            }
        }
    });


    // ===========================================================
    // DATATABLE LISTADO DE VENTAS
    // ===========================================================
    let table = $('#data').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: { action: 'list' },
            dataSrc: ""
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { data: 'cli.names' },
            { data: 'date_joined' },
            { data: 'subtotal' },

            // IGV (%)
            {
                data: 'iva',
                render: function (data) {
                    return parseFloat(data).toFixed(2);
                }
            },

            // IGV calculado
            {
                data: 'calculated_iva',
                render: function (data) {
                    return parseFloat(data).toFixed(2);
                }
            },

            { data: 'total' },

            // ACCIONES
            {
                data: null,
                className: 'text-center',
                orderable: false,
                render: function (data, type, row, meta) {

                    let pdf_url = '/erp/sale/invoice/pdf/' + row.id + '/';

                    return `
                        <div class="btn-group btn-group-sm">

                            <a href="${pdf_url}" target="_blank" 
                               class="btn btn-secondary" title="PDF">
                                <i class="far fa-file-pdf"></i>
                            </a>

                            <button type="button" class="btn btn-warning btn-edit" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>

                            <button type="button" class="btn btn-info btn-details" title="Detalles">
                                <i class="fas fa-eye"></i>
                            </button>

                            <button type="button" class="btn btn-danger btn-delete" title="Eliminar">
                                <i class="fas fa-trash-alt"></i>
                            </button>

                        </div>
                    `;
                }
            }
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
        }
    });


    // ===========================================================
    // VER DETALLE DE LA VENTA
    // ===========================================================
    $('#data tbody').on('click', '.btn-details', function () {

        let tr = table.row($(this).closest('tr')).data();

        $('#tblDetails').DataTable({
            destroy: true,
            responsive: true,
            autoWidth: false,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    action: 'products_detail',
                    id: tr.id
                },
                dataSrc: ""
            },
            columns: [
                { data: "prod.name" },
                { data: "prod.cate.name" },
                { data: "price" },
                { data: "cant" },
                { data: "subtotal" }
            ],
            language: {
                url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
            }
        });

        $('#modalDetails').modal('show');
    });


    // ===========================================================
    // ELIMINAR VENTA
    // ===========================================================
    let sale_id = null;

    $('#data tbody').on('click', '.btn-delete', function () {
        let tr = table.row($(this).closest('tr')).data();
        sale_id = tr.id;
        $('#modalDelete').modal('show');
    });

    $('#btnConfirmDelete').on('click', function () {

        if (!sale_id) return;

        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: {
                action: 'delete',
                id: sale_id
            },
            headers: { 'X-CSRFToken': csrftoken },
            success: function (data) {
                if (!data.error) {
                    $('#modalDelete').modal('hide');
                    table.ajax.reload(null, false);
                    sale_id = null;
                } else {
                    Swal.fire("Error", data.error, "error");
                }
            }
        });
    });


    // ===========================================================
    // EDITAR: ABRIR MODAL
    // ===========================================================
    $('#data tbody').on('click', '.btn-edit', function () {

        let tr = table.row($(this).closest('tr')).data();

        $('#sale_id').val(tr.id);
        $('#date_joined').val(tr.date_joined);
        $('#subtotal').val(tr.subtotal);
        $('#iva').val(tr.iva);
        $('#total').val(tr.total);

        $('#modalEdit').modal('show');
    });


    // ===========================================================
    // EDITAR: GUARDAR CAMBIOS
    // ===========================================================
    $('#frmSaleEdit').on('submit', function (e) {
        e.preventDefault();

        let formData = new FormData(this);
        formData.append('action', 'edit');

        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: formData,
            headers: { 'X-CSRFToken': csrftoken },
            processData: false,
            contentType: false,
            success: function (data) {

                if (!data.error) {
                    $('#modalEdit').modal('hide');
                    table.ajax.reload(null, false);
                } else {
                    Swal.fire("Error", data.error, "error");
                }
            }
        });

    });

});
