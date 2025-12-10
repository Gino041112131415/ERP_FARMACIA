$(function () {

    // 1. Activar el DateRangePicker
    $('input[name="date_range"]').daterangepicker({
        locale: {
            format: 'DD/MM/YYYY',
            applyLabel: '<i class="fas fa-chart-pie"></i> Aplicar',
            cancelLabel: '<i class="fas fa-times"></i> Cancelar'
        }
    });

    // 2. Activar DataTable
    let table = $('#data').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: function (d) {
                d.action = 'searchdata';
                d.date_range = $('input[name="date_range"]').val(); // 🔥 aquí mandamos el rango
            },
            dataSrc: ""
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { data: 'cliente' },
            { data: 'fecha' },
            { data: 'subtotal' },
            { data: 'iva' },
            { data: 'total' },
            {
                data: 'id',
                className: 'text-center',
                orderable: false,
                render: function (data) {
                    return `
                        <a href="/sale/detail/${data}/" class="btn btn-info btn-sm">
                            <i class="fas fa-eye"></i>
                        </a>
                    `;
                }
            }
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
        }
    });

    // 3. Cuando cambie la fecha, recargar la tabla
    $('input[name="date_range"]').on('apply.daterangepicker', function () {
        table.ajax.reload(); // 🔥 refresca el DataTable
    });

});


