$(document).ready(function () {
    //VALIDAR CAMPO - SOLO LETRAS
    jQuery.validator.addMethod("sololetras", function (value, element) {
        return this.optional(element) || /^[a-z]+$/i.test(value);
    }, "Solo ingrese letras.");
    //VALIDAR CAMPO - SOLO LETRAS Y ESPACIOS
    jQuery.validator.addMethod("sololetrasyespacios", function (value, element) {
        return this.optional(element) || /^[a-z\s]+$/i.test(value);
    }, "Solo ingrese letras y espacios.");
    //CAMBIAR MENSAJE DE REQUERIDO PARA TODOS LOS CAMPOS
    jQuery.extend(jQuery.validator.messages, {
        required: "Este campo es obligatorio."
    });
    //region
    $("#region").ready(function () {
        $.get("https://apis.digital.gob.cl/dpa/regiones",
            function (data) {
                //en data capturo lo que me retorna la API
                $.each(data, function (i, item) {
                    //por cada item agrego una nueva fila a mi tabla
                    $("#region").append(`<option value="${item.codigo}">${item.nombre}</option>`);
                });
            });
    });

    //provincia
    $("#region").change(function () {
        var select = document.getElementById("provincia");
        var length = select.options.length;
        for (i = 1; i < length;) {
            select.options[i] = null;
            length = select.options.length;
        }

        var select = document.getElementById("comuna");
        var length = select.options.length;
        for (i = 1; i < length;) {
            select.options[i] = null;
            length = select.options.length;
        }
        $.get("https://apis.digital.gob.cl/dpa/provincias",
            function (data) {
                //en data capturo lo que me retorna la API
                $.each(data, function (i, item) {
                    if (item.codigo_padre == $("#region").val()) {
                        //por cada item agrego una nueva fila a mi tabla
                        $("#provincia").append(`<option value="${item.codigo}">
                                       ${item.nombre}
                                  </option>`);
                    }
                });
            });
    });


    //comuna
    $("#provincia").change(function () {
        var select = document.getElementById("comuna");
        var length = select.options.length;
        for (i = 1; i < length;) {
            select.options[i] = null;
            length = select.options.length;
        }
        $.get("https://apis.digital.gob.cl/dpa/comunas",
            function (data) {
                //en data capturo lo que me retorna la API
                $.each(data, function (i, item) {
                    if (item.codigo_padre == $("#provincia").val()) {
                        //por cada item agrego una nueva fila a mi tabla
                        $("#comuna").append(`<option value="${item.codigo}">
                                       ${item.nombre}
                                  </option>`);
                    }
                });
            });
    });

    //VALIDAR CAMPOS DE FORMULARIO DE DONACION
    $("#donation-form").validate({
        rules: {
            nombre: {
                required: true,
                minlength: 3,
                sololetras: true
            },
            apellido: {
                required: true,
                sololetras: true,
                minlength: 3
            },
            correo: {
                required: true,
                email: true
            },
            celular: {
                required: true,
                digits: true,
                min: 900000000,
                max: 999999999
            },
            calle: {
                required: true,
                sololetrasyespacios: true,
                minlength: 5
            },
            region: {
                required: true
            },
            provincia: {
                required: true
            },
            comuna: {
                required: true
            },
            monto: {
                required: true,
                digits: true,
                min: 1000,
                max: 20000
            }
        },
        messages: {
            nombre: {
                minlength: "El nombre debe tener al menos 3 letras."
            },
            correo: {
                email: "El correo debe tener el siguiente formato: correo@dominio.xx"
            },
            celular: {
                min: "El número debe tener el siguiente formato 9XXXXXXXX.",
                max: "El número debe tener el siguiente formato 9XXXXXXXX.",
                digits: "Por favor, ingrese un solo dígitos.",
                number: "Por favor, ingrese un solo dígitos."
            },
            calle: {
                minlength: "El mensaje debe tener al menos 5 letras."
            },
            monto: {
                min: "El monto a donar puede ser entre 1.000 a 20.000 CLP",
                max: "El monto a donar puede ser entre 1.000 a 20.000 CLP",
                digits: "Por favor, ingrese un solo dígitos.",
                number: "Por favor, ingrese un solo dígitos."
            }
        }


    });

    //VALIDAR DONATION-FORM
    $(function () {
        $('#donation-form').submit(function () {
            if ($(this).valid()) {
                alert('Será redireccionado a la página de inicio');
            }
        });
    });

});