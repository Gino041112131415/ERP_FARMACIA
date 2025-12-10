// static/user/js/list.js
$(function () {

    const defaultAvatarUrl = '/static/img/usuario.png';  // cambia si tu ruta es otra

    // ==============================
    //  DATATABLE PRINCIPAL
    // ==============================
    let table = $('#data').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: { action: 'searchdata' },
            dataSrc: ""
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { data: 'first_name' },
            { data: 'last_name' },
            { data: 'username' },
            { data: 'date_joined' },
            {
                data: 'image',
                orderable: false,
                className: 'text-center',
                render: function (data) {
                    return `
                        <img src="${data}" 
                             class="user-avatar d-block mx-auto" 
                             alt="avatar">
                    `;
                }
            },
            {
                data: 'id',
                className: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-warning btn-sm btn-edit" data-id="${data}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm btn-delete" data-id="${data}">
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

    // ==============================
    //  BOTÓN "NUEVO USUARIO"
    // ==============================
    $('#btnAddUser').on('click', function () {
        $('#formUser')[0].reset();
        $('#user_id').val('');
        $('#user_action').val('create');
        $('#modalUserTitle').text('Nuevo usuario');
        $('#id_is_active').prop('checked', true);
        $('#avatarPreview').attr('src', defaultAvatarUrl);
        $('#id_image').val('');
        $('#modalUser').modal('show');
    });

    // ==============================
    //  BOTÓN CAMBIAR FOTO → INPUT FILE
    // ==============================
    $('#btnChangePhoto').on('click', function () {
        $('#id_image').trigger('click');
    });

    // Preview de imagen al seleccionar archivo
    $('#id_image').on('change', function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (ev) {
            $('#avatarPreview').attr('src', ev.target.result);
        };
        reader.readAsDataURL(file);
    });

    // ==============================
    //  EDITAR (CARGAR DATOS)
    // ==============================
    $('#data tbody').on('click', '.btn-edit', function () {
        let id = $(this).data('id');

        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: {
                action: 'get_user',
                id: id
            },
            success: function (resp) {
                if (resp.error) {
                    message_error(resp.error);
                    return;
                }

                $('#formUser')[0].reset();
                $('#user_id').val(resp.id);
                $('#user_action').val('update');
                $('#modalUserTitle').text('Editar usuario');

                $('input[name="first_name"]').val(resp.first_name);
                $('input[name="last_name"]').val(resp.last_name);
                $('input[name="username"]').val(resp.username);
                $('input[name="email"]').val(resp.email || '');
                $('#id_is_active').prop('checked', resp.is_active);

                $('#avatarPreview').attr('src', resp.image || defaultAvatarUrl);
                $('#id_image').val('');

                $('#modalUser').modal('show');
            }
        });
    });

    // ==============================
    //  GUARDAR (CREAR / EDITAR)
    // ==============================
    $('#formUser').on('submit', function (e) {
        e.preventDefault();

        let formData = new FormData(this);
        let action = $('#user_action').val();
        formData.set('action', action);

        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (resp) {
                if (resp.error) {
                    let msg = typeof resp.error === 'string' ? resp.error : JSON.stringify(resp.error);
                    message_error(msg);
                    return;
                }
                Swal.fire('Correcto', resp.success, 'success');
                $('#modalUser').modal('hide');
                table.ajax.reload(null, false);
            }
        });
    });

    // ==============================
    //  ELIMINAR
    // ==============================
    $('#data tbody').on('click', '.btn-delete', function () {
        let id = $(this).data('id');

        Swal.fire({
            title: '¿Eliminar usuario?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar'
        }).then(result => {
            if (!result.isConfirmed) return;

            $.ajax({
                url: window.location.pathname,
                type: 'POST',
                data: {
                    action: 'delete',
                    id: id
                },
                success: function (resp) {
                    if (resp.error) {
                        message_error(resp.error);
                        return;
                    }
                    Swal.fire('Correcto', resp.success, 'success');
                    table.ajax.reload(null, false);
                }
            });
        });
    });

});
