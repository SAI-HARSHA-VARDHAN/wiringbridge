window.onload = function() {
    $.ajax({
        url : 'https://backend.scrapshut.com/company/ratings',
        type : 'GET',
        dataType:'json',
        headers : {
            "API-KEY":"jOM8kPZv.HQ4Cmufk9B27kPqCEGZ5ZczuOmCHbnds"
        },
        success : function(data) {   
        console.log(data);
        // var html = ``;
        // if(data.length <= 2){
        //     data.forEach(element => {
        //         var dname = element.company_name.split("_")[0].split(" ")[0];
        //         var cname = element.company_name.split("_")[0].toUpperCase();
        //         if(cname.length > 15){
        //             cname = cname.split(" ")[0];
        //         }
        //         html += `<div class="card" style="width: 18rem;">
        //                         <img src="public/img/cie.png" class="card-img-top" height="100px" alt="CIE">
        //                         <div class="card-body">
        //                         <h5 class="card-title">${cname}</h5>`;
        //         var roundedAvg = element.avg_rating;
        //         for(let j=0;j<roundedAvg;j++){
        //                 html += `<span class='scrapstar' style='color:gold;'>★</span>`
        //         }
        //         let remain = 5 - roundedAvg;
        //         for(let j=0;j<remain;j++){
        //             html += `<span class='scrapstar scrapremain'>&#9734;</span>`
        //         }
        //         html  += `<span class='scraprate'> ${element.avg_rating}</span>`
        //         html +=  `<a href="${element.domain}" target="_blank" style="margin-top:10px;" class="btn btn-primary">Visit ${dname}</a>
        //                         </div>
        //                     </div>`;
        //     });
        //     $("#startupsresult").append(html);
        // }
        // else{
        //     for(var i=0;i<3;i++){
        //         var dname = data[i].company_name.split("_")[0].split(" ")[0];
        //         var cname = data[i].company_name.split("_")[0].toUpperCase();
        //         if(cname.length > 15){
        //             cname = cname.split(" ")[0];
        //         }
        //         html += `<div class="card" style="width: 18rem;">
        //                         <img src="public/img/cie.png" class="card-img-top" height="100px" alt="CIE">
        //                         <div class="card-body">
        //                         <h5 class="card-title">${cname}</h5>`;
        //         var roundedAvg = data[i].avg_rating;
        //         for(let j=0;j<roundedAvg;j++){
        //                 html += `<span class='scrapstar' style='color:gold;'>★</span>`
        //         }
        //         let remain = 5 - roundedAvg;
        //         for(let j=0;j<remain;j++){
        //             html += `<span class='scrapstar scrapremain'>&#9734;</span>`
        //         }
        //         html  += `<span class='scraprate'> ${data[i].avg_rating}</span>`
        //         html +=  `<a href="${data[i].domain}" target="_blank" style="margin-top:10px;" class="btn btn-primary">Visit ${dname}</a>
        //                         </div>
        //                     </div>`;
        //         }
        //         $("#startupsresult").append(html);
        // }
        var html1 = ``;
        data.forEach(element => {
        var dname = element.company_name.split("_")[0].split(" ")[0];
        var cname = element.company_name.split("_")[0].toUpperCase();
            if(cname.length > 15){
                cname = cname.split(" ")[0];
            }
        html1     += `<div class="card" style="width: 18rem;">
                                <div class="card-header" style="padding:25.5px;">
                                <img src="public/img/scrap.png" class="" height="60px" width="80px;" alt="CIE">
                                </div>
                                <div class="card-body">
                                <h5 class="card-title" style="margin-top:18px;">${cname}</h5>`;
        var roundedAvg = element.avg_rating;
        for(let j=0;j<roundedAvg;j++){
                html1 += `<span class='scrapstar' style='color:gold;'>★</span>`
        }
        let remain = 5 - roundedAvg;
        for(let j=0;j<remain;j++){
            html1 += `<span class='scrapstar scrapremain'>&#9734;</span>`
        }
        html1  += `<span class='scraprate'> ${element.avg_rating}</span>`
        html1 +=  `<p class="card-text"><span id="rating"></span></p>`;
        html1 +=  `<a href="${element.domain}" target="_blank" class="btn btn-primary">Visit ${dname}</a>
                                </div>
                            </div>`;
        });
        html1 += `<div class="card" style="width: 18rem;">
                        <div class="card-header" style="padding:0px;">
                        <img src="public/img/collab.jpg" class="card-img-top" height="113px" alt="CIE">
                        </div>
                        <div class="card-body">
                        <!-- <br/> -->
                        <h5 class="card-title">Add Scrap-plug</h5>
                        <p class="card-text">Click on plug this button and signup</p>
                        <a href="https://scrapshut.com" target="_blank" class="btn btn-primary">Visit Scrapshut</a>
                        </div>
                    </div> `;
        $("#mainContent").html(html1);
        if(!localStorage.access_token){
            $("#mainContent").css("display","block");
            $("#mainContent1").css("display","block");
        }
            $("#loading").css("display","none");
        },
        error : function(request,error)
        {
            console.log("Request: "+JSON.stringify(request));
        }
    });
}