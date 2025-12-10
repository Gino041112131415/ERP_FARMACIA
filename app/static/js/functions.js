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
// AJAX UNIVERSAL CORREGIDO
// ==============================
function submit_with_ajax(url, parameters, callback) {

    const isFormData = parameters instanceof FormData;

    $.ajax({
        url: url,
        type: 'POST',
        data: parameters,
        dataType: 'json',
        processData: !isFormData,
        contentType: !isFormData ? 'application/x-www-form-urlencoded; charset=UTF-8' : false,
    }).done(function (data) {

        console.log("🔥 Servidor respondió:", data);

        // ------------------------------------
        // 🔥 VALIDACIÓN CORRECTA DE ERROR
        // ------------------------------------
        if (data.error && data.error !== "") {
            message_error(data.error);
            return;
        }

        // ------------------------------------
        // 🔥 SI NO HAY ERROR → EJECUTAR CALLBACK
        // ------------------------------------
        callback(data);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('❌ Error AJAX:', textStatus, errorThrown);
        message_error(`${textStatus}: ${errorThrown}`);
    });
}



// ======================================================
// Confirmación estilo profesor (solo para eliminar)
// ======================================================
function alert_action(title, content, callback) {

    $.confirm({
        theme: 'material',
        title: title,
        icon: 'fa fa-info',
        content: content,
        columnClass: 'small',
        typeAnimated: true,
        cancelButtonClass: 'btn-primary',
        draggable: true,
        dragWindowBorder: false,

        buttons: {

            info: {
                text: "Sí",
                btnClass: 'btn-primary',
                action: function () {
                    callback();
                }
            },

            danger: {
                text: "No",
                btnClass: 'btn-red',
                action: function () {}
            }
        }
    });
}
