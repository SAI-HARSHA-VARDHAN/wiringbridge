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
            const roundedAvg = Math.round(avg)
            var html = ``;
            for(let j=0;j<roundedAvg;j++){
                html += `<span class='star' style='color:gold;'>★</span>`
            }
            let remain = 5 - roundedAvg;
            for(let j=0;j<remain;j++){
                html += `<span class='star remain'>&#9734;</span>`
            }
            html += ` <span class="rating">${roundedAvg} out of 5</span>`;
            $("#rating").html(html);
            $("#rating1").html(html);
        //     if(localStorage.access_token){
        //         $('#navbar-list').append(`<li id="signedIn" class="nav-item dropdown">
        //         <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
        //             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //             ${localStorage.name}
        //         </a>
            
        //         <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        //             <a class="dropdown-item profile" href="profile.html" id="profileBtn">Profile</a>

        //             <a class="dropdown-item" href="javascript:void(0);">Scrapstats: ${localStorage.scrapcoins}</a>

        //             <a class="dropdown-item" id="sign-in-or-out-button" href="#">Sign Out</a>
        //         </div>
        //     </li>`);
        //     }
        //     else{
        //           $('#navbar-list').append(`<li id="notSignedIn" class="nav-item">
        //     <button id="sign-in-or-out-button" class="btn btn-success my-2 my-sm-0" type="submit">Sign in
        //     </button>
        // </li>`)
        //     }
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