// =========================
// CONFIGURACIÓN GLOBAL
// =========================
var date_range = null;
var date_now = moment().format('YYYY-MM-DD');

function generate_report() {

    var parameters = {
        action: 'search_report',
        start_date: '',
        end_date: ''
    };

    if (date_range !== null) {
        parameters['start_date'] = date_range.startDate.format('YYYY-MM-DD');
        parameters['end_date'] = date_range.endDate.format('YYYY-MM-DD');
    }

    $('#data').DataTable({
        responsive: true,
        destroy: true,
        autoWidth: false,
        deferRender: true,

        order: false,
        paging: false,
        ordering: false,
        info: false,
        searching: false,

        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: parameters,
            dataSrc: ""
        },

        // =========================
        // COLUMNAS
        // =========================
        columns: [
            {
                // Nro de fila (1,2,3…)
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { data: 1 }, // cliente
            { data: 2 }, // fecha
            { data: 3 }, // subtotal
            { data: 4 }, // igv
            { data: 5 }  // total
        ],

        // =========================
        // DAR FORMATO A SUBTOTAL / IGV / TOTAL
        // =========================
        columnDefs: [
            {
                targets: [-1, -2, -3],
                className: 'text-center',
                orderable: false,
                render: function (data) {
                    return 'S/ ' + parseFloat(data).toFixed(2);
                }
            }
        ],

        // =========================
        // BOTONES (EXCEL + PDF)
        // =========================
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                text: 'Descargar Excel <i class="fas fa-file-excel"></i>',
                titleAttr: 'Excel',
                className: 'btn btn-success btn-flat btn-xs'
            },
            {
                extend: 'pdfHtml5',
                text: 'Descargar PDF <i class="fas fa-file-pdf"></i>',
                titleAttr: 'PDF',
                download: 'open',
                className: 'btn btn-danger btn-flat btn-xs',
                orientation: 'landscape',
                pageSize: 'A4',

                customize: function (doc) {

                    // Tamaño de columnas
                    doc.content[1].table.widths = ['20%', '20%', '15%', '15%', '15%', '15%'];

                    // Margen superior
                    doc.content[1].margin = [0, 35, 0, 0];

                    // Layout simple
                    doc.content[1].layout = {};

                    // Footer personalizado
                    doc['footer'] = function (page, pages) {
                        return {
                            margin: [10, 0],
                            columns: [
                                {
                                    alignment: 'left',
                                    text: ['Fecha de creación: ', { text: date_now }]
                                },
                                {
                                    alignment: 'right',
                                    text: ['Página ', { text: page.toString() }, ' de ', { text: pages.toString() }]
                                }
                            ]
                        };
                    };
                }
            }
        ],

        language: {
            url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json"
        }
    });
}

// =========================
// INICIALIZACIÓN
// =========================
$(function () {

    $('input[name="date_range"]').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            applyLabel: '<i class="fas fa-chart-pie"></i> Aplicar',
            cancelLabel: '<i class="fas fa-times"></i> Cancelar'
        },
        startDate: date_now,
        endDate: date_now
    })

    .on('apply.daterangepicker', function (ev, picker) {
        date_range = picker;
        generate_report();
    })

    .on('cancel.daterangepicker', function (ev, picker) {

        $(this).data('daterangepicker').setStartDate(date_now);
        $(this).data('daterangepicker').setEndDate(date_now);

        date_range = $(this).data('daterangepicker');
        generate_report();
    });

    generate_report();
});
