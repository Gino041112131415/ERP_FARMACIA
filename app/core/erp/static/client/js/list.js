$(function () {

    var tblClients = $('#data').DataTable({
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
            {   // Número correlativo
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {"data": "names"},
            {"data": "surnames"},
            {"data": "dni"},
            {"data": "birthday"},
            {"data": "address"},
            {"data": "sexo"},

            // === BOTONES (EDITAR / BORRAR) ===
            {
                data: null,
                className: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    return `
                        <div class="btn-group btn-group-sm" role="group">
                            <button type="button" class="btn btn-warning btn-sm btn-edit" data-id="${row.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <a href="/erp/client/delete/${row.id}/" class="btn btn-danger btn-sm">
                                <i class="fas fa-trash-alt"></i>
                            </a>
                        </div>
                    `;
                }
            }
        ]
    });

    // ========= CSRF =========
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
    var csrftoken = getCookie('csrftoken');


    // ========= ABRIR MODAL NUEVO =========
    $('#btnAdd').on('click', function () {

        // Resetear formulario
        $('#frmClient')[0].reset();

        // Título del modal
        $('#modalTitle').text('Nuevo Cliente');

        // Acción y URL para crear
        $('#action').val('add');
        $('#frmClient').data('url', '/erp/client/add/');

        // Limpiar el select correctamente
        $('select[name="sexo"]').val('').change();

        // Mostrar modal
        $('#myModalClient').modal('show');
    });


    // ========= ABRIR MODAL EDITAR =========
    $('#data tbody').on('click', '.btn-edit', function () {
        var tr = tblClients.row($(this).closest('tr')).data();

        $('#modalTitle').text('Editar Cliente');
        $('#action').val('edit');
        $('#frmClient').data('url', '/erp/client/update/' + tr.id + '/');

        // Rellenar campos
        $('input[name="names"]').val(tr.names);
        $('input[name="surnames"]').val(tr.surnames);
        $('input[name="dni"]').val(tr.dni);
        $('input[name="birthday"]').val(tr.birthday);
        $('input[name="address"]').val(tr.address);
        $('select[name="sexo"]').val(tr.sexo);

        $('#myModalClient').modal('show');
    });


    // ========= SUBMIT FORM (AJAX) =========
    $('#frmClient').on('submit', function (e) {
        e.preventDefault();

        var url = $(this).data('url');
        var formData = new FormData(this);

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            headers: {'X-CSRFToken': csrftoken},
            processData: false,
            contentType: false,
            success: function (data) {

                if (!data.hasOwnProperty('error')) {
                    $('#myModalClient').modal('hide');
                    tblClients.ajax.reload(null, false);
                    return;
                }

                alert("Error: " + data.error);
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                alert("Error al enviar datos");
            }
        });
    });

});
