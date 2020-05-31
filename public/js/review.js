let data1;

function onSubmit(token) {
    document.getElementById("formId").submit();
}

$('#formId').on('submit', function (e) {
    if (grecaptcha.getResponse() == ""){
        alert("Please check the recaptcha");
        return;
    }

    var form = $(this), // this will resolve to the form submitted
        action = form.attr('action'),
        type = form.attr('method'),
        data = {};

    // Make sure you use the 'name' field on the inputs you want to grab. 
    form.find('[name]').each(function (i, v) {
        var input = $(this), // resolves to current input element.
            name = input.attr('name'),
            value = input.val();
        data[name] = value;
    });
    data.tags = data.tags.split(',')
    // data.rating = localStorage.rate
    data.rate = localStorage.rate
    data.anonymous = localStorage.anonymous
    data.fake = localStorage.fake
    data1 = data;
    data = JSON.stringify(data)
    $.ajax({
        type: "POST",
        headers : {
            Authorization :'JWT '+localStorage.access_token,
            "API-KEY":"LrUyJbg2.hbzsN46K8ghSgF8LkhxgybbDnGqqYhKM"
        },
        contentType: 'application/json',
        url: 'https://backend.scrapshut.com/api/post/',
        data: data,
        success: function (data) {
            // alert(Object.values(data));
            document.getElementById("mod").click();
        },
        error: function(data)
        {
            var error = JSON.parse(Object.values(data)[16]);
            var errorDetails = error.details;
            if(errorDetails == undefined){
                errorDetails = error.detail;
            }
            if(errorDetails == undefined){
                 errorDetails = error.url;
            }
            if(errorDetails == "Error decoding signature."){
                document.getElementById("mod1").click();
            }
            else{
                alert("Error: "+errorDetails);
            }
        }
    });

    e.preventDefault();
});