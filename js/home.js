$( document ).ready(function() {
    $('.form-control').not('.fakeinput').on('keyup blur', function (e) {
        $(this).closest('.form-group').removeClass('has-error');
        $(this).removeClass("invalid");
    });
    $('input[type="checkbox"],input[type="radio"]').on('click', function () {
        $(this).removeClass("invalid");
        $(this).closest('.form-group').removeClass('has-error');
        $(this).closest('.radio-option').removeClass('invalid');
        $(this).closest('.check-field').removeClass('invalid');
    });
    $('select').selectmenu();
    $('select').on('change selectmenuchange', function () {
        $(this).closest('.form-group').removeClass('has-error');
    });
    $(".form-group .ui-selectmenu-button").on("focus", function () {
        $(this).closest(".form-group").addClass("is-focused");
    });
    $(".form-group .ui-selectmenu-button").on("focusout", function () {
        $(this).closest(".form-group").removeClass("is-focused");
    });
    $(".form-control").focusin(function () {
        $(this).closest(".form-group").addClass("is-focused");
    });
    $(".form-control").focusout(function () {
        $(this).closest(".form-group").removeClass("is-focused");
    });
    $.validator.addMethod("Mobile", function (a, b) {
        return this.optional(b) || a.match(/^[6-9]\d+$/) && a.length >= 10
    }, "* The number should start only with 9 or 8 or 7 or 6");
    $.validator.addMethod("pan", function (value, element) {
        return this.optional(element) || /^[a-zA-Z]{3}[Pp][a-zA-Z][0-9]{4}[a-zA-Z]$/.test(value) && value.length == 10;
    }, "* Invalid PAN No");
    $.validator.addMethod(
        "email",
        function (value, element) {
            return (
                this.optional(element) ||
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value
                    )
                    );
                },
        "Enter valid email address !"
    );
    var date = new Date();
    var m = date.getMonth(),
    d = date.getDate(),
    y = date.getFullYear();
    var defaultyear = y - 21;
    $('#dob').datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        yearRange: "-58:+0",
        maxDate: "-20y",
        defaultDate: new Date(defaultyear, m, d)
    });
    $("#basicDetails").validate({
        ignore: [],
        errorClass: 'invalid',
        errorPlacement: function (error, element) {
            var errorText = error.text();
            if (element.closest('.form-group').find('.help-block').length < 1) {
                element.closest('.form-group').append('<span class="help-block">');
            }
            element.closest('.form-group').addClass('has-error');
            element.closest('.form-group').find('.help-block').html(errorText);
        },
        highlight: function (element, errorClass) {
            $(element).addClass(errorClass).parent().prev().children("select").addClass(errorClass);
            if ($(element).attr('type') == 'radio' || $(element).attr('type') == 'checkbox') {
                $(element).parent().parent().addClass(errorClass);
            }
        },
        rules: {
            firstName: {
                required: true,
            },
            lastName: {
                required: true,
            },
            mobileNumber: {
                required: true,
                Mobile: true
            },
            pincode: {
                required: true,
            },
            dob: {
                required: true,
            },
            currentCity: {
                required: true,
            },
            monthlyIncome: {
                required: true,
            },
            employmentTpye: {
                required: true,
            },
            accept: {
                required: true,
            },
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("#propertyDetails").validate({
        ignore: [],
        errorClass: 'invalid',
        errorPlacement: function (error, element) {
            var errorText = error.text();
            if (element.closest('.form-group').find('.help-block').length < 1) {
                element.closest('.form-group').append('<span class="help-block">');
            }
            element.closest('.form-group').addClass('has-error');
            element.closest('.form-group').find('.help-block').html(errorText);
        },
        highlight: function (element, errorClass) {
            $(element).addClass(errorClass).parent().prev().children("select").addClass(errorClass);
            if ($(element).attr('type') == 'radio' || $(element).attr('type') == 'checkbox') {
                $(element).parent().parent().addClass(errorClass);
            }
        },
        rules: {
            propertyType: {
                required: true,
            },
            propertyValue: {
                required: true,
            },
            propertyLocatin: {
                required: true,
            },
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
});
$(".NumericFormat").autoNumeric({
    mDec: "0",
    lZero: "deny",
    vMax: "9999999"
});
function OnlyCharSpace(event) {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/^[a-zA-Z ]+$/i);
    return pattern.test(value);
}
function OnlyNumeric(event) {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/^[0-9]*$/i);
    return pattern.test(value);
}
$('#firstName').bind('keypress', OnlyCharSpace);
$('#lastName').bind('keypress', OnlyCharSpace);
$('#mobileNumber').bind('keypress', OnlyNumeric);
$('#pincode').bind('keypress', OnlyNumeric);
$('#monthlyIncome').bind('keypress', OnlyNumeric);
$('#propertyValue').bind('keypress', OnlyNumeric);

function inrFormat(val) {
    var x = val;
    x = x.toString();
    var afterPoint = "";
    if (x.indexOf(".") > 0) afterPoint = x.substring(x.indexOf("."), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    var res =
        otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
        lastThree +
        afterPoint;
    return res;
};

//range slider js
var $element = $('input[type="range"]');
$element.rangeslider({
    polyfill: false,
    onInit: function() {
      var $handle = $('.rangeslider__handle', this.$range);
      updateHandle($handle[0], this.value);
    }
}).on('input', function(e) {
    var $handle = $('.rangeslider__handle', e.target.nextSibling);
    updateHandle($handle[0], this.value);
});
function updateHandle(el, val) {
    $("#loan_amount").val(val);
    $("#demo").text(inrFormat(val));
}