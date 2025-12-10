$(function () {
    $('#data').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: { 'action': 'searchdata' },
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

            // Imagen
            {
                data: 'image',
                orderable: false,
                class: 'text-center',
                render: function (data) {
                    if (!data) {
                        return `<span class="text-muted">Sin imagen</span>`;
                    }
                    return `
                        <img src="${data}"
                        class="img-fluid d-block mx-auto"
                        style="width: 50px; height: 50px; object-fit: cover;">
                    `;
                }
            },

            // STOCK con badge
            {
                data: 'stock',
                class: 'text-center',
                render: function (data) {
                    if (data <= 5) {
                        return `<span class="badge badge-danger">${data}</span>`;
                    }
                    return `<span class="badge badge-success">${data}</span>`;
                }
            },

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

        /* 🚀 AQUI SE COLOREA TODA LA FILA */
        rowCallback: function (row, data) {

            if (data.stock <= 5) {
                $(row).addClass('row-low-stock');  // 🔥 rojo suave
            } else {
                $(row).addClass('row-good-stock'); // 🍃 verde suave
            }
        },

        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
        }
    });
});


