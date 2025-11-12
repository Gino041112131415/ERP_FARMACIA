$(function () {
    $('#data').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: {
                'action': 'searchdata'
            },
            dataSrc: ""
        },
        columns: [
            {   // 👇 NÚMERO SECUENCIAL en lugar del id real
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;  // 🔢 1, 2, 3...
                }
            },
            {"data": "name"},
            {"data": "desc"},
            {   // 👇 Columna de botones (editar/eliminar)
                data: null,
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var buttons = '<a href="/erp/category/update/' + row.id + '/" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></a> ';
                    buttons += '<a href="/erp/category/delete/' + row.id + '/" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></a>';
                    return buttons;
                }
            }
        ],
        initComplete: function (settings, json) {
            // Puedes dejar esto vacío o usarlo luego para inicializaciones extra
        }
    });
});
