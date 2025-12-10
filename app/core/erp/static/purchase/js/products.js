var tableProducts;

var purchase = {
    items: {
        products: []
    },

    calculate: function () {
        let total = 0;
        this.items.products.forEach(function (item) {
            item.subtotal = item.quantity * item.purchase_price;
            total += item.subtotal;
        });

        $("#total_compra").text(total.toFixed(2));
    },

    add: function (product) {
        product.quantity = 1;
        product.purchase_price = 0;
        product.sale_price = product.pvp;
        product.expiration_date = "";
        product.subtotal = 0;

        this.items.products.push(product);

        this.list();
    },

    list: function () {
        tableProducts = $("#tableProducts").DataTable({
            destroy: true,
            autoWidth: false,
            responsive: true,
            deferRender: true,
            data: this.items.products,

            columns: [
                { data: null },
                { data: "name" },
                { data: "quantity" },
                { data: "purchase_price" },
                { data: "sale_price" },
                { data: "expiration_date" },
                { data: "subtotal" }
            ],

            columnDefs: [
                {
                    targets: 0,
                    class: "text-center",
                    render: function () {
                        return `<button class="btn btn-danger btn-sm btnRemove">
                                    <i class="fas fa-trash"></i>
                                </button>`;
                    }
                },
                {
                    targets: 2,
                    render: function (data, type, row) {
                        return `<input type="number" class="form-control form-control-sm input-qty" value="${row.quantity}">`;
                    }
                },
                {
                    targets: 3,
                    render: function (data, type, row) {
                        return `<input type="number" class="form-control form-control-sm input-buy" value="${row.purchase_price}">`;
                    }
                },
                {
                    targets: 4,
                    render: function (data, type, row) {
                        return `<input type="number" class="form-control form-control-sm input-sell" value="${row.sale_price}">`;
                    }
                },
                {
                    targets: 5,
                    render: function (data, type, row) {
                        return `<input type="date" class="form-control form-control-sm input-exp" value="${row.expiration_date}">`;
                    }
                },
                {
                    targets: 6,
                    render: function (data) {
                        return "S/ " + parseFloat(data).toFixed(2);
                    }
                }
            ],

            rowCallback: function (row, data) {
                // cantidad
                $(row).find(".input-qty").on("change keyup", function () {
                    data.quantity = parseInt($(this).val());
                    purchase.calculate();
                });

                // precio compra
                $(row).find(".input-buy").on("change keyup", function () {
                    data.purchase_price = parseFloat($(this).val());
                    purchase.calculate();
                });

                // precio venta
                $(row).find(".input-sell").on("change keyup", function () {
                    data.sale_price = parseFloat($(this).val());
                });

                // vencimiento
                $(row).find(".input-exp").on("change", function () {
                    data.expiration_date = $(this).val();
                });
            }
        });

        this.calculate();
    }
};


$(function () {

    // Autocompletado
    $('input[name="search"]').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: window.location.pathname,
                type: "POST",
                data: {
                    action: "search_products",
                    term: request.term
                },
                dataType: "json",
                success: function (data) {
                    response(data);
                }
            });
        },

        select: function (event, ui) {
            event.preventDefault();
            purchase.add(ui.item);
            $(this).val("");
        }
    });


    // Eliminar fila
    $("#tableProducts tbody").on("click", ".btnRemove", function () {
        let row = tableProducts.row($(this).parents("tr"));
        purchase.items.products.splice(row.index(), 1);
        purchase.list();
    });


    // Guardar detalles
    $("#btnSave").on("click", function () {

        if (purchase.items.products.length === 0) {
            message_error("Debe agregar al menos un producto.");
            return;
        }

        let details = purchase.items.products;

        $.ajax({
            url: window.location.pathname,
            type: "POST",
            data: {
                action: "add_details",
                details: JSON.stringify(details)
            },
            success: function (response) {
                if (!response.error) {
                    Swal.fire({
                        title: "Correcto",
                        text: response.success,
                        icon: "success"
                    });
                }
            }
        });

    });

});
