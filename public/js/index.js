// function hideReviewBtn(data) {
//     if (data == 'hide') {
//         document.getElementById("thisToHide").style.display = "none";
//     }
//     else {
//         document.getElementById("thisToHide").style.display = "block";
//     }

// }

// document.getElementById("myForm").onclick = hideReviewBtn('hide');
// document.querySelector('.container').onclick = hideReviewBtn('unhide');

var cnt = 0;

//Genuine or spam logic
function selected(a,b,c){
    var id = "sel"+a+b;
    var postid = c;
    var bo;
    if(b==0){
        bo = 1;
    }
    else{
        bo = 0;
    }
    var ido = "sel"+a+bo;
    document.getElementById(id).style.filter="blur(0px)";
    document.getElementById(ido).style.filter="blur(1px)";
    if(b==0){
        var sel = "upvote";
    }
    else{
        var sel = "downvote";
    }
    var url = "https://backend.scrapshut.com/api/post/vote/"+postid+"/"+localStorage.userid+"/"+sel;
    $.ajax({
        type: "GET",
        headers : {
            Authorization :'JWT '+localStorage.access_token
        },
        contentType: 'application/json',
        url: url,
        data: {},
        success: function (data) {
            console.log(data);
            console.log("success");
        },
        error: function(data)
        {
            console.log(data);
        }
    });
}

function toggletext(a){
    var id = "#toggle"+a;
    if($(id).text() == "Show Reviews"){
        $(id).text('Hide Reviews');
    }
    else{
        $(id).text('Show Reviews');
    }
}
function maketags(c,tags){
    var id = "#tags"+c;
    tags = tags.split(",");
    var html = `<p class="tagcont">`;
    if(tags.length == 1 && tags[0]==""){
        console.log(tags.length);
        html+=`<span class="tagtext">No Tags</span></p>`;
    }
    else{
         for(var i =0;i<tags.length;i++){
            if(tags[i].toLowerCase() == "fake"){
                // fakeCount+=1;
                html += `<span class="tagtext" style="background-color:red;">${tags[i]}</span>&nbsp&nbsp`;
            }
            else{
                // reviewCount+=1;
                html += `<span class="tagtext">${tags[i]}</span>&nbsp&nbsp`;
            }
        }
        html += `</p>`;
    }
    $(id).html(html);
}
let searchFun = function (event) {

    let payload = $(this).val();

    if (payload == '' || payload == ' ') {
        $('.card').remove()
        $('.alert').remove()
        return
    }
    console.log(payload)
    $('.card').remove()
    $('.alert').remove()
    $.getJSON("https://backend.scrapshut.com/api/post/?search=" + payload, function (data) {
        if (data.count == 0) {
            $("#Result").append(
                `<div class="alert alert-danger text-center" role="alert">
                Oops...no search result.
              </div>`
            );
        }
        else {
            for (let i = 0; i < data.count; i++) {
                cnt+=1;
                let tags = data.results[i].tags.toString();
                var str = `${tags}`;
                $("#Result").append(
                    `<div class="card cardy" style="margin-top:20px;width:50vw;margin-bottom:20px;">
                        <h5 class="card-header"><p id="tags${cnt}">&nbsp&nbsp&nbspTags: ${str}</p></h5>
                        <div class="card-body">
                        <div class="row">
                        <div class="col-10"><h5 class="card-title"><a target="_blank" href="${data.results[i].url}"> ${data.results[i].url}</a></h5></div>
                        <div class='col-2'> <p style="color:#EF4136"><b>${data.results[i].rate}<i class="fa fa-star" aria-hidden="true"></i></b></p></div>
                        </div>
                        <br/>
                        <p style='text-align:right'>
                        <button class="btn btn-primary btn" type="button" data-toggle="collapse" data-target="#collapseExample${cnt}" aria-expanded="false" aria-controls="collapseExample" onclick="toggletext(${cnt})" id="toggle${cnt}">Show Reviews</button>
                        </p>
                        <div class="collapse" id="collapseExample${cnt}">
                            <p><br/><b>${data.results[i].author}</b></p>
                            <p>&nbsp&nbsp&nbspReview: ${data.results[i].review}</p>
                            <img src="public/img/ok.png" height="35px" class="select" id="sel${cnt}0" onclick="selected(${cnt},0,${data.results[i].id})"><img src="public/img/stop.png" height="35px"  class="select" id="sel${cnt}1" onclick="selected(${cnt},1,${data.results[i].id})" style="margin-left:20px;">
                        </div>
                        </div>
                    </div>`
                );
                maketags(cnt,tags);
            }
        }
    });
};
// <div class="card mt-3">
//                     <div class="card-body">
//                         <div class="row">
//                             <div class="col-md-8"><a href="${data.results[i].url}"><p>Title: ${data.results[i].title}</p></a></div>
//                             <div class="col-md-4">Rating: ${data.results[i].rate}</div>
//                         </div>
//                         <div class="row">
//                             <div class="col-md-4"> Author: ${data.results[i].author}</div>
//                             <div class="col-md-4"> Review: ${data.results[i].review}</div>
//                             <div class="col-md-4">Tags: ${tags}</div>
//                         </div>
//                     </div>
//                 </div>

$(function () {
    $("#searchField").keyup(searchFun);
});

$(function () {
    $("input[type=search]").focusin(function () {
        $('.the-logo').css({
            // "width": 200,
            // "height": 100,
            // "margin-left": "-1000px",
            // "-webkit-transition": "all 0.5s ease-in-out;",
            // "transition": "all 0.5s ease-in-out;"
            "display":"none"
        });
    });
    $("input[type=search]").focusout(function () {
        $('.the-logo').css({
            // "width": 400,
            // "height": 300,
            // "margin-left": "-1px",
            // "-webkit-transition": "all 0.5s ease-in-out;",
            // "transition": "all 0.5s ease-in-out;"
            "display": "block"
        });
    });
});
