var tableProducts;

var vents = {

    items: {
        cli: '',
        date_joined: '',
        subtotal: 0.00,
        iva: 0.00,        // % IGV (NO el monto)
        total: 0.00,
        products: []
    },

    // ================================
    //   CALCULAR FACTURA (CORREGIDO)
    // ================================
    calculate_invoice: function () {

        var subtotal = 0.00;

        var raw_iva = $('input[name="iva"]').val().replace(',', '.');
        var iva_percent = parseFloat(raw_iva);

        if (isNaN(iva_percent)) iva_percent = 0;

        var iva_decimal = iva_percent / 100;

        // SUMAR SUBTOTAL
        $.each(this.items.products, function (pos, dict) {
            dict.subtotal = dict.cant * parseFloat(dict.pvp);
            subtotal += dict.subtotal;
        });

        // GUARDAR SUBTOTAL
        this.items.subtotal = subtotal;

        // CALCULAR IGV REAL
        var iva_amount = subtotal * iva_decimal;

        // GUARDAR VALORES CORRECTOS
        this.items.iva = iva_percent;         // GUARDAMOS % IGV
        this.items.total = subtotal + iva_amount;

        // MOSTRAR EN PANTALLA
        $('input[name="subtotal"]').val(subtotal.toFixed(2));
        $('#id_igv_calculado').val(iva_amount.toFixed(2));
        $('input[name="total"]').val(this.items.total.toFixed(2));
    },

    add: function (item) {
        item.subtotal = item.cant * item.pvp;
        this.items.products.push(item);
        this.list();
        this.calculate_invoice();
    },

    list: function () {

        tableProducts = $('#tableProducts').DataTable({
            responsive: true,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            data: this.items.products,

            columns: [
                { "data": "id" },
                { "data": "name" },
                { "data": "cate.name" },
                { "data": "pvp" },
                { "data": "cant" },
                { "data": "subtotal" },
            ],

            columnDefs: [

                {
                    targets: [0],
                    class: 'text-center',
                    orderable: false,
                    render: function () {
                        return '<a rel="remove" class="btn btn-danger btn-xs btn-flat">' +
                            '<i class="fas fa-trash-alt"></i></a>';
                    }
                },

                {
                    targets: [-3],
                    class: 'text-center',
                    render: function (data) {
                        return '$' + parseFloat(data).toFixed(2);
                    }
                },

                {
                    targets: [-2],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        return '<input type="text" name="cant" ' +
                            'class="form-control form-control-sm input-sm touchspin-cant" ' +
                            'autocomplete="off" value="' + row.cant + '">';
                    }
                },

                {
                    targets: [-1],
                    class: 'text-center',
                    render: function (data) {
                        return '$' + parseFloat(data).toFixed(2);
                    }
                },
            ],

            rowCallback: function (row, data, displayNum, displayIndex, dataIndex) {

                var $input = $(row).find('input[name="cant"]');

                $input.TouchSpin({
                    min: 1,
                    max: 1000000,
                    step: 1
                });

                $input.off().on('change keyup touchspin.on.stopspin', function () {

                    var tr = tableProducts.cell($(this).closest('td')).index();
                    var nueva_cant = parseInt($(this).val()) || 1;

                    vents.items.products[tr.row].cant = nueva_cant;

                    vents.calculate_invoice();

                    var new_sub = vents.items.products[tr.row].subtotal.toFixed(2);
                    $('td:eq(5)', tableProducts.row(tr.row).node()).html('$' + new_sub);
                });

            }
        });

        // ELIMINAR PRODUCTO
        $('#tableProducts tbody')
            .off('click', 'a[rel="remove"]')
            .on('click', 'a[rel="remove"]', function () {

                var tr = tableProducts.cell($(this).closest('td, li')).index();

                alert_action(
                    'Notificación',
                    '¿Estás seguro de eliminar el producto de tu detalle?',
                    function () {

                        vents.items.products.splice(tr.row, 1);

                        vents.list();
                        vents.calculate_invoice();
                    }
                );

            });

    }
};

$(function () {

    // TOUCHSPIN IGV
    $("input[name='iva']").TouchSpin({
        min: 0,
        max: 100,
        step: 0.1,
        decimals: 2,
        postfix: '%'
    }).val(18);

    $('input[name="iva"]').on('change keyup', function () {
        vents.calculate_invoice();
    });

    // AUTOCOMPLETE PRODUCTOS
    $('input[name="search"]').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: window.location.pathname,
                type: 'POST',
                data: {
                    action: 'search_products',
                    term: request.term
                },
                dataType: 'json',
                success: function (data) {
                    response(data);
                }
            });
        },

        delay: 500,
        minLength: 1,

        select: function (event, ui) {
            event.preventDefault();

            ui.item.cant = 1;
            ui.item.subtotal = ui.item.pvp;

            vents.add(ui.item);
            $(this).val('');
        }
    });

    // ELIMINAR TODO
    $('.btnRemoveAll').on('click', function () {

        if (vents.items.products.length === 0) return false;

        alert_action(
            'Notificación',
            '¿Estás seguro de eliminar todos los items de tu detalle?',
            function () {

                vents.items.products = [];
                vents.list();
                vents.calculate_invoice();

            }
        );

    });

    // GUARDAR VENTA
    $('form').on('submit', function (e) {
        e.preventDefault();

        vents.items.date_joined = $('input[name="date_joined"]').val();
        vents.items.cli = $('select[name="cli"]').val();

        var parameters = new FormData();

        parameters.append('action', $('input[name="action"]').val());
        parameters.append('vents', JSON.stringify(vents.items));

        submit_with_ajax(
            window.location.pathname,
            parameters,
            function () {
                location.href = '/erp/sale/list/';
            }
        );
    });
});
