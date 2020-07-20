window.onload = function() {
    $.ajax({
        url : 'https://backend.scrapshut.com/api/service/post/?search=cie',
        type : 'GET',
        dataType:'json',
        success : function(data) {    
            var avg;
            var sum = 0;       
            const length = data.length;
            $("#count").html(length.toString());
            $("#count1").html(length.toString());
            data.forEach(element => {
                sum += Number(element.rate);
            });
            avg = sum/(data.length);
            $("#rating").html(avg.toString());
            $("#rating1").html(avg.toString());
            $("#mainContent").css("display","block");
            $("#mainContent1").css("display","block");
            $("#loading").css("display","none");
        },
        error : function(request,error)
        {
            console.log("Request: "+JSON.stringify(request));
        }
    });
}