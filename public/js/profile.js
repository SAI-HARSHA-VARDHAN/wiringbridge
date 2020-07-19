window.onload = function(){
    $("#userName").html(localStorage.name);
    $("#scrapCoins").html(localStorage.scrapcoins);
    $("#userImage").attr("src",localStorage.userImage);
    getUserReviews();
}

var cnt = 0;
var Data = null;
var currentData = null;
var ac = 0, fc = 0;

function edit(id){
    document.getElementById("gridCheck2").checked = false;
    document.getElementById("gridCheck1").checked = false;
    Data.forEach(e => {
        if(e.id == id){
            currentData = e;
            console.log(currentData);
            $("#inputPassword4").val(e.url);
            $("#inputEmail4").val(e.review);
            $("#inputAddress2").val(e.tags.join(","));
            if(e.fake == true){
                document.getElementById("gridCheck2").checked = true;
                localStorage.fake = true;
                fc = 1;
            }
            else{
                localStorage.fake = false;
            }
            if(e.anonymous == true){
                document.getElementById("gridCheck1").checked = true;
                localStorage.anonymous = true;
                ac = 1;
            }
            else{
                localStorage.anonymous = false;
            }
            $("#mode").click();
        }
    });
}

function updaterate(a) {
    localStorage.rate = a.toString();
}


function updatean() {
      if (ac == 0) {
        ac = 1;
        localStorage.anonymous = "true";
      }
      else {
        ac = 0;
        localStorage.anonymous = "false";
      }
    }
    function updatefk() {
      if (fc == 0) {
        fc = 1;
        localStorage.fake = "true";
      }
      else {
        fc = 0;
        localStorage.fake = "false";
      }
    }

function updateReview() {
    currentData.rate = localStorage.rate;
    currentData.url = $("#inputPassword4").val();
    currentData.review = $("#inputEmail4").val();
    currentData.tags = $("#inputAddress2").val().split(",");
    currentData.fake = localStorage.fake;
    currentData.anonymous = localStorage.anonymous;
    console.log(currentData.fake);
    if(currentData.fake == true || currentData.fake == 'true'){
        currentData.under_review = true;
    }
    else{
        currentData.under_review = false;
    }
    console.log(JSON.stringify(currentData));
    const url = "https://backend.scrapshut.com/api/post/"+currentData.id+"/";
    $.ajax({
            type: "PUT",
            headers : {
                Authorization :'JWT '+localStorage.access_token,
                "API-KEY":"80IdCIAg.E9yZMEHQyQhemv7cEbfkwZP8ulW8ZqVE"
            },
            contentType: 'application/json',
            url: url,
            data: JSON.stringify(currentData),
            success: function (data) {
                console.log(data);
                $("#mode").click();
                alert("Success");
                $("#result").html('<p style="text-align: center;" id="loading"><img class="img-fluid" src="public/img/loading.gif"></p');
                getUserReviews();
            },
            error: function(data)
            {
                console.log(data);
            }
    });
}

function deleteReview(id){
    var userIntention = confirm("Are you sure you want to delete?");
    if(userIntention){
        $("#result").html('<p style="text-align: center;" id="loading"><img class="img-fluid" src="public/img/loading.gif"></p');
        const url = "https://backend.scrapshut.com/api/post/"+id+"/";
        $.ajax({
                type: "DELETE",
                headers : {
                    Authorization :'JWT '+localStorage.access_token,
                    "API-KEY":"80IdCIAg.E9yZMEHQyQhemv7cEbfkwZP8ulW8ZqVE"
                },
                contentType: 'application/json',
                url: url,
                success: function (data) {
                    console.log(data);
                    alert("Successfully deleted");
                    getUserReviews();
                },
                error: function(data)
                {
                    console.log(data);
                }
        });
    }
}

function maketagsAndadvertisement(c,tags,adv,data){
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
                html += `<span class="tagtext" style="background-color:red;">${tags[i]}</span>&nbsp&nbsp`;
            }
            else{
                html += `<span class="tagtext">${tags[i]}</span>&nbsp&nbsp`;
            }
        }
        html += `<span class="right" style="" onClick=deleteReview(${data.id})><i class="fa fa-trash" aria-hidden="true"></i></span><span class="right" onclick="edit(${data.id})" style=""><i class="fa fa-edit" aria-hidden="true"></i></span></p>`;
    }
    $(id).html(html);
    if(adv == null){
        var idAdvButton = "advbtn"+c;
        document.getElementById(idAdvButton).disabled = true;
    }
    else if(adv.title == "" && adv.title=="" && adv.advertizing_content == ""){
        var idAdvButton = "advbtn"+c;
        document.getElementById(idAdvButton).disabled = true;
    }
    else if(adv.title == null && adv.title==null && adv.advertizing_content == null){
        var idAdvButton = "advbtn"+c;
        document.getElementById(idAdvButton).disabled = true;
    }
    else{

    }
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
function toggletextadv(a){
    var id = "#advbtn"+a;
    if($(id).text() == "Advertisement"){
        $(id).text('Hide');
    }
    else{
        $(id).text('Advertisement');
    }
}

function selected(a,b,c){
    if(localStorage.userid != undefined){
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
                Authorization :'JWT '+localStorage.access_token,
                "API-KEY":"LrUyJbg2.hbzsN46K8ghSgF8LkhxgybbDnGqqYhKM"
            },
            contentType: 'application/json',
            url: url,
            data: {},
            success: function (data) {
                console.log(data);
                var iduc = "#upc"+postid;
                var iddc = "#dc"+postid;
                if(data.upvotes != undefined){
                    $(iduc).html(" "+data.upvotes);
                    $(iddc).html(" "+data.downvotes);
                }
                else{
                    alert(data.message);
                }
            },
            error: function(data)
            {
                console.log(data);
            }
        });
    }
    else{
        $("#mod1").click();
    }
}

function getUserReviews() {
    const reviewsUrl = "https://backend.scrapshut.com/user/me/";
    $.ajax({
        type: "GET",
        headers : {
            Authorization :'JWT '+localStorage.access_token,
            "API-KEY":"80IdCIAg.E9yZMEHQyQhemv7cEbfkwZP8ulW8ZqVE"
        },
        contentType: 'application/json',
        url: reviewsUrl,
        data: {},
        success: function (data) {
            $("#result").html('');
            $("#totalReviews").html(data.count.toString());
            var data = data.results;
            Data = data;
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                cnt+=1;
                let tags = data[i].tags.toString();
                var str = `${tags}`;
                $("#result").append(
                    `<div class="card cardy" style="margin-top:20px;width:50vw;margin-bottom:20px;">
                        <h5 class="card-header">
                            <p id="tags${cnt}">&nbsp&nbsp&nbspTags: ${str}</p>
                        </h5>
                        <div class="card-body">
                        <div class="row">
                        <div class="col-10"><h5 class="card-title"><a target="_blank" href="${data[i].url}"> ${data[i].url}</a></h5></div>
                        <div class='col-2'> <p style="color:#EF4136"><b>${data[i].rate}<i class="fa fa-star" aria-hidden="true"></i></b></p></div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-6">
                                <p style='text-align:left'><button class="btn btn-danger btn" type="button" id="advbtn${cnt}" data-toggle="collapse" data-target="#collapseExample1${cnt}" aria-expanded="false" aria-controls="collapseExample1" onclick="toggletextadv(${cnt})">Advertisement</button></p>
                            </div>
                            <div class="col-6">
                                <p style='text-align:right'><button class="btn btn-primary btn" type="button" data-toggle="collapse" data-target="#collapseExample${cnt}" aria-expanded="false" aria-controls="collapseExample" onclick="toggletext(${cnt})" id="toggle${cnt}">Show Reviews</button></p>
                            </div>
                        </div>
                        <div class="collapse" id="collapseExample${cnt}">
                            <p><br/><b>${data[i].author}</b></p>
                            <p>&nbsp&nbsp&nbspReview: ${data[i].review}</p>
                            <img src="public/img/ok.png" height="25px" class="select" id="sel${cnt}0" onclick="selected(${cnt},0,${data[i].id})"><span class="count"  id="upc${data[i].id}"><b> </b></span><img src="public/img/stop.png" height="25px"  class="select" id="sel${cnt}1" onclick="selected(${cnt},1,${data[i].id})" style="margin-left:20px;"><span class="counter" id="dc${data[i].id}"> </span>
                        </div>`
                );
                if(data[i].advertisement){
                    $("#Result").append(`
                    <div class="collapse" id="collapseExample1${cnt}">
                            <h4>${data[i].advertisement.title}</h4>
                            <p>${data[i].advertisement.advertizing_content}</p>
                            <a href='${data[i].advertisement.url}' target="_balnk">${data[i].advertisement.url}</a>
                        </div>
                        </div>
                    </div>`);
                }
                else{
                     $("#Result").append(`
                        </div>
                    </div>`);
                }
                maketagsAndadvertisement(cnt,tags,data[i].advertisement,data[i]);
                $("#mainContent").css("display","block");
                $("#loading").css("display","none");
            }
            console.log("success");
        },
        error: function(data)
        {
            console.log(data);
        }
    });
}