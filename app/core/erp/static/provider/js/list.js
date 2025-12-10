$(function () {

    var tbl = $("#data").DataTable({
        responsive: true,
        destroy: true,
        ajax: {
            url: window.location.pathname,
            type: "POST",
            data: { action: "searchdata" },
            dataSrc: ""
        },
        columns: [
            { data: null, render: (d,t,r,m)=>m.row+1 },
            { data: "company" },
            { data: "address" },
            { data: "contact_name" },
            { data: "phone" },
            { data: "email" },

            {
                data: null,
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-warning btn-sm btn-edit" data-id="${row.id}">
                            <i class="fas fa-edit"></i>
                        </button>

                        <button class="btn btn-danger btn-sm btn-delete" data-id="${row.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                }
            }
        ]
    });

    // Obtener CSRF
    function getCookie(name){
        let value=null;
        document.cookie.split(";").forEach(function(c){
            c=c.trim();
            if(c.startsWith(name+"=")) value=c.substring(name.length+1);
        });
        return value;
    }
    const csrftoken = getCookie("csrftoken");

    // NUEVO
    $("#btnAdd").on("click", function(){
        $("#frmProvider")[0].reset();
        $("#action").val("add");
        $("#frmProvider").data("url", "/erp/provider/add/");
        $("#modalTitle").text("Nuevo Proveedor");
        $("#modalProvider").modal("show");
    });

    // EDITAR
    $("#data tbody").on("click", ".btn-edit", function(){
        let row = tbl.row($(this).closest("tr")).data();

        $("#action").val("edit");
        $("#frmProvider").data("url", "/erp/provider/update/" + row.id + "/");

        $('input[name="company"]').val(row.company);
        $('input[name="address"]').val(row.address);
        $('input[name="contact_name"]').val(row.contact_name);
        $('input[name="phone"]').val(row.phone);
        $('input[name="email"]').val(row.email);

        $("#modalTitle").text("Editar Proveedor");
        $("#modalProvider").modal("show");
    });

    // GUARDAR (ADD / EDIT)
    $("#frmProvider").on("submit", function(e){
        e.preventDefault();

        $.ajax({
            url: $(this).data("url"),
            type: "POST",
            headers: { "X-CSRFToken": csrftoken },
            data: new FormData(this),
            contentType: false,
            processData: false,
            success: function(resp){
                if (!resp.error) {
                    $("#modalProvider").modal("hide");
                    tbl.ajax.reload(null, false);
                } else {
                    alert("ERROR: " + resp.error);
                }
            }
        });
    });


    // ==================================================
    //  ELIMINAR CON MODAL
    // ==================================================
    $("#data tbody").on("click", ".btn-delete", function(){
        let id = $(this).data("id");
        $("#delete-id").val(id);
        $("#modalDeleteProvider").modal("show");
    });

    $("#btnConfirmDelete").on("click", function(){
        let id = $("#delete-id").val();

        $.ajax({
            url: `/erp/provider/delete/${id}/`,
            type: "POST",
            headers: { "X-CSRFToken": csrftoken },
            success: function(resp){
                $("#modalDeleteProvider").modal("hide");
                tbl.ajax.reload(null, false);
            },
            error: function(){
                alert("No se pudo eliminar el proveedor.");
            }
        });
    });

});
