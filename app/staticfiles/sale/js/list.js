$(function () {

    // ===============================
    // CSRF
    // ===============================
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

    // ===============================
    // DATATABLE
    // ===============================
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

            // ⭐ IGV (%) — MOSTRAR EL PORCENTAJE REAL
            {
                data: 'iva',
                render: function (data) {
                    return parseFloat(data).toFixed(2);
                }
            },

            // ⭐ IGV CALCULADO — LEER IGV_CALCULADO REAL
            {
                data: 'calculated_iva',
                render: function (data) {
                    return parseFloat(data).toFixed(2);
                }
            },

            { data: 'total' },

            {
                data: null,
                className: 'text-center',
                orderable: false,
                render: function (data, type, row, meta) {

                    let url_invoice = '/erp/sale/invoice/pdf/' + row.id + '/';

                    return `
                        <div class="btn-group btn-group-sm">

                            <!-- BOTÓN PDF -->
                            <a href="${url_invoice}" class="btn btn-secondary" target="_blank" title="Ver PDF">
                                <i class="far fa-file-pdf"></i>
                            </a>

                            <!-- EDITAR -->
                            <button type="button" class="btn btn-warning btn-edit" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>

                            <!-- VER DETALLE -->
                            <button type="button" class="btn btn-info btn-details" title="Ver detalle">
                                <i class="fas fa-eye"></i>
                            </button>

                            <!-- ELIMINAR -->
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

    // ===============================
    // VER DETALLE
    // ===============================
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

    // ===============================
    // ELIMINAR
    // ===============================
    let sale_id = null;

    $('#data tbody').on('click', '.btn-delete', function () {
        let tr = table.row($(this).closest('tr')).data();
        sale_id = tr.id;
        $('#modalDelete').modal('show');
    });

    $('#btnConfirmDelete').on('click', function () {

        if (sale_id === null) return;

        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: {
                action: 'delete',
                id: sale_id
            },
            headers: { 'X-CSRFToken': csrftoken },
            success: function (data) {
                if (!data.hasOwnProperty('error')) {
                    $('#modalDelete').modal('hide');
                    table.ajax.reload(null, false);
                    sale_id = null;
                } else {
                    alert(data.error);
                }
            }
        });
    });

    // ===============================
    // EDITAR (ABRIR MODAL)
    // ===============================
    $('#data tbody').on('click', '.btn-edit', function () {

        let tr = table.row($(this).closest('tr')).data();

        $('#sale_id').val(tr.id);
        $('#date_joined').val(tr.date_joined);
        $('#subtotal').val(tr.subtotal);
        $('#iva').val(tr.iva);
        $('#total').val(tr.total);

        $('#modalEdit').modal('show');
    });

    // ===============================
    // EDITAR (GUARDAR)
    // ===============================
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

                if (!data.hasOwnProperty('error')) {
                    $('#modalEdit').modal('hide');
                    table.ajax.reload(null, false);
                    return;
                }

                alert(data.error);
            }
        });

    });

});
