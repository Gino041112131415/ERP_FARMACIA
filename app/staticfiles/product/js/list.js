$(function () {
    $('#data').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: window.location.pathname, // usa la URL actual (ej. /erp/product/list/)
            type: 'POST',
            data: { 'action': 'searchdata' }, // 👈 ahora sí enviamos "action"
            dataSrc: ""
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { data: 'name' },
            { data: 'cate.name' },
            {
                data: 'image',
                render: function (data) {
                    if (!data) {
                        return '<span class="text-muted">Sin imagen</span>';
                    }
                    return `<img src="${data}" style="width:50px;height:50px;" class="img-fluid rounded">`;
                }
            },
            { data: 'stock' },
            { data: 'pvp' },
            {
                data: 'id',
                class: 'text-center',
                orderable: false,
                render: function (data) {
                    return `
                        <a href="/erp/product/update/${data}/" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></a>
                        <a href="/erp/product/delete/${data}/" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></a>
                    `;
                }
            }
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
        }
    });
});
