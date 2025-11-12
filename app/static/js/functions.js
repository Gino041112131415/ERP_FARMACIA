// ==============================
// Mostrar mensajes de error con SweetAlert
// ==============================
function message_error(obj) {
    let html = '';

    if (typeof obj === 'object') {
        html = '<ul style="text-align: left;">';
        $.each(obj, function (key, value) {
            if (Array.isArray(value)) {
                html += `<li><b>${key}</b>: ${value[0]}</li>`;
            } else {
                html += `<li><b>${key}</b>: ${value}</li>`;
            }
        });
        html += '</ul>';
    } else {
        html = `<p>${obj}</p>`;
    }

    Swal.fire({
        title: 'Error!',
        html: html,
        icon: 'error'
    });
}


// ==============================
// Confirmación y envío AJAX
// ==============================
function submit_with_ajax(url, parameters, callback) {
    $.confirm({
        theme: 'material',
        title: 'Confirmación',
        icon: 'fa fa-info',
        content: '¿Estás seguro de continuar con esta acción?',
        columnClass: 'medium',
        typeAnimated: true,
        cancelButtonClass: 'btn-primary',
        draggable: true,
        dragWindowBorder: false,
        buttons: {
            info: {
                text: "Sí",
                btnClass: 'btn-primary',
                action: function () {

                    // ✅ Verificar si parameters es FormData o no
                    const isFormData = parameters instanceof FormData;

                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: parameters,
                        dataType: 'json',
                        processData: !isFormData ? true : false, // si es FormData → false
                        contentType: !isFormData ? 'application/x-www-form-urlencoded; charset=UTF-8' : false,
                    }).done(function (data) {
                        console.log('✅ Respuesta del servidor:', data);

                        if (!data.hasOwnProperty('error')) {
                            callback();
                            return false;
                        }
                        message_error(data.error);

                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        console.error('❌ Error AJAX:', textStatus, errorThrown);
                        message_error(`${textStatus}: ${errorThrown}`);
                    });
                }
            },
            danger: {
                text: "No",
                btnClass: 'btn-danger',
                action: function () {
                    console.log('Acción cancelada por el usuario');
                }
            }
        }
    });
}
