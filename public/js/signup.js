(function() {

    $.validator.setDefaults({
        submitHandler: function() {

            var data = {};
            $("#signupForm").serializeArray().map(function(x) {
                data[x.name] = x.value;
            });

            // start loader
            document.dispatchEvent(new CustomEvent('loadingStart'));

            $.post("/api/create-user", data, function(response) {

                if (response.success) {

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

        }
    });

    $(document).ready(function() {

        $('.reset').click(function() {
            $('input').val('');
        });

        // validate signup form on keyup and submit
        $("#signupForm").validate({
            rules: {
                type: "required",
                name: "required",
                mobile: {
                    required: true,
                    minlength: 10
                },
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6
                },
                confirm_password: {
                    required: true,
                    minlength: 6,
                    equalTo: "#password"
                }
            },
            messages: {
                type: "Please select account type",
                name: "Please enter name",
                mobile: {
                    required: "Please provide a mobile number",
                    minlength: "Invalid mobile number."
                },
                email: "Please enter a valid email address",
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 6 characters long"
                },
                confirm_password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 6 characters long",
                    equalTo: "Please enter the same password as above"
                }
            }
        });

    });

})();
