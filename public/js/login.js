$(document).ready(function() {

    var token;

    // stop loader
    document.dispatchEvent(new CustomEvent('loadingComplete'));

    $('.form-signin').submit(function(e) {

        var email = $('#username').val(),
            password = $('#password').val();

        e.preventDefault();

        // start loader
        document.dispatchEvent(new CustomEvent('loadingStart'));

        $.post("/api/login", {

            email: email,
            password: password

        }, function(response) {

            if(response.success) {

                title = "Success";
                type = "success";
                token = response.data.token;
                location.reload();

            } else {

                title = "Failed";
                type = "error";

            }

            // stop loader
            document.dispatchEvent(new CustomEvent('loadingComplete'));

            // notify user
            new PNotify({
                title: title,
                text: response.data.message,
                type: type,
                styling: 'bootstrap3'
            });

        });

    });
});
