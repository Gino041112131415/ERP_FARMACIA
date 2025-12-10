// static/inventory/js/list.js
$(function () {

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
                d.start_date = $('#filter_start').val();
                d.end_date = $('#filter_end').val();
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
            { data: 'date' },
            { data: 'type_display' },
            { data: 'product_name' },
            {
                data: 'quantity',
                className: 'text-center',
                render: function (data, type, row) {
                    // type viene como 'IN' o 'OUT'
                    if (row.type === 'OUT') {
                        return `<span class="qty-out">- ${data}</span>`;
                    }
                    return `<span class="qty-in">+ ${data}</span>`;
                }
            },
            { data: 'user_name' },
            { data: 'origin' },
            {
                data: null,
                orderable: false,
                className: 'text-center',
                render: function (data, type, row) {
                    return `
                        <button rel="delete" class="btn btn-danger btn-xs btn-flat">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    `;
                }
            }
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
        }
    });

    // ============== Filtros por fecha ==============
    $('#filter_start, #filter_end').on('change', function () {
        table.ajax.reload();
    });

    $('#btnClearFilter').on('click', function () {
        $('#filter_start').val('');
        $('#filter_end').val('');
        table.ajax.reload();
    });

    // ============== Eliminar movimiento (SweetAlert) ==============
    $('#data tbody').on('click', 'button[rel="delete"]', function () {
        let tr = table.cell($(this).closest('td, li')).index();
        let rowData = table.row(tr.row).data();

        Swal.fire({
            title: '¿Estás seguro?',
            text: `Se eliminará el movimiento #${rowData.id}. Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            confirmButtonColor: '#e3342f',
            cancelButtonColor: '#6c757d',
        }).then((result) => {
            if (!result.isConfirmed) {
                return;
            }

            let params = new FormData();
            params.append('action', 'delete');
            params.append('id', rowData.id);

            $.ajax({
                url: window.location.pathname,
                type: 'POST',
                data: params,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (!data.hasOwnProperty('error')) {
                        table.ajax.reload();
                        Swal.fire({
                            title: 'Eliminado',
                            text: data.success || 'Movimiento eliminado correctamente.',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false
                        });
                    } else {
                        Swal.fire('Error', data.error, 'error');
                    }
                },
                error: function (xhr, status, error) {
                    Swal.fire('Error', error, 'error');
                }
            });
        });
    });

});


