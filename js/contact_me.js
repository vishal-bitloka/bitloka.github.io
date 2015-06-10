$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: 'http://ctapi.apphb.com/api/connect/email',
                type: "POST",
                data: {
                  'Name': name,
                  'Email': email,
                  'Phone': phone,
                  'Message': message
                },
                headers: {
                  AccessCode: '85f9eda2-f63f-4280-ba13-79312c7d8b83'
                },
                dataType: 'json',
                cache: false,
                success: function(data) {
                    $("#successful").show();
                    $("#success_message").html(data.Message);

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    $("#error").show();

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
