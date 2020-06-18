var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/userinfo.email openid';
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}
/*checking whether token is present or not */

function initClient() {
  var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
  gapi.client.init({
    //   'apiKey': 'YOUR_API_KEY',
    'clientId': '478932307585-4tmv4oujlpv55u3ehcutm4udjuc9vanq.apps.googleusercontent.com',
    'scope': SCOPE
  }).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.isSignedIn.listen(updateSigninStatus);
    var user = GoogleAuth.currentUser.get();
    setSigninStatus();
    $('#sign-in-or-out-button').click(function () {
      handleAuthClick();
    });
    $('#revoke-access-button').click(function () {
      revokeAccess();
    });
  });
}

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    GoogleAuth.signOut(
      localStorage.removeItem("auth_token"),
      localStorage.removeItem("scrapcoins"),
      localStorage.removeItem("userid"),
      localStorage.removeItem('name')
    );
    window.location.reload();
  } else {
    let async_func = async function() {
      const promise1 = await GoogleAuth.signIn();
      const promise2 = await new Promise(r => setTimeout(r,600));
      const promise3 = await window.location.reload();
    }
     async_func();
    
  }
}

function revokeAccess() {
  GoogleAuth.disconnect();
}

function setSigninStatus(isSignedIn) {
  var user = GoogleAuth.currentUser.get();
  console.log(user.getAuthResponse().access_token);
  if (user.getAuthResponse().access_token != undefined) {
    data = {
      "provider": "google",
      "token": `${user.getAuthResponse().access_token}`
    }
    dat = JSON.stringify(data);
    console.log(dat);
    $.ajax({
      type: "POST",
      headers : {
        "API-KEY":"LrUyJbg2.hbzsN46K8ghSgF8LkhxgybbDnGqqYhKM"
      },
      contentType: "application/json",
      url: "https://backend.scrapshut.com/a/google/",
      data: dat,
      error: function (e) {
        console.log("Error" + e);
      },
      success: function (msg) {
        uname = msg.username
        localStorage.name = uname
        utoken = msg.access_token
        localStorage.access_token = utoken
        console.log(localStorage.access_token)
      }
    });
  }
  var isAuthorized = user.hasGrantedScopes(SCOPE);
  // if (localStorage.access_token && isAuthorized)
  if (localStorage.access_token) {
    $('#signedIn').remove()
    localStorage.removeItem("access_token");
    console.log("removed")

    $('#navbar-list').append(`<li id="signedIn" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${localStorage.name}
            </a>
     
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item profile" href="timeline.html" id="profileBtn">Profile</a>
                <a class="dropdown-item" href="javascript:void(0);">Scrapstats: ${localStorage.scrapcoins}</a>
                <a class="dropdown-item" id="sign-in-or-out-button" href="#">Sign Out</a>
            </div>
        </li>`);
    $('#notSignedIn').remove()
    $('.profile').show();
    // $('#sign-in-or-out-button').html('Sign out');
    // $('#revoke-access-button').css('display', 'inline-block');
    // $('#auth-status').html('You are currently signed in and have granted ' +
    //     'access to this app.');


  } else {
    
    $('#notSignedIn').remove()
    // $('#sign-in-or-out-button').html('SignIN');
    $('#revoke-access-button').css('display', 'none');
    // $('#auth-status').html('You have not authorized this app or you are ' +
    //   'signed out.');

    $('#navbar-list').append(`<li id="notSignedIn" class="nav-item">
            <button id="sign-in-or-out-button" class="btn btn-success my-2 my-sm-0" type="submit">Sign in
            </button>
        </li>`)
        $('#signedIn').remove()

  }
}

function updateSigninStatus(isSignedIn) {
  setSigninStatus();
}

if(localStorage.access_token != undefined){
  fetchProfile();
}

//To fetch user profile
function fetchProfile(){
  $.ajax({
        type: "POST",
        headers : {
            Authorization :'JWT '+localStorage.access_token,
            "API-KEY":"LrUyJbg2.hbzsN46K8ghSgF8LkhxgybbDnGqqYhKM"
        },
        contentType: 'application/json',
        url: 'https://backend.scrapshut.com/user/profile/',
        data: {},
        success: function (data) {
            var scrapcoins =  data.results[0].Scrapcoins;
            var id =  data.results[0].userid;
            localStorage.scrapcoins = scrapcoins;
            localStorage.userid = id;
            console.log(localStorage.scrapcoins);
            console.log(localStorage.userid);
        },
        error: function(data)
        {
            var error = JSON.parse(data.responseText);
            if(error.details == "Tags for this user already exists !"){
                fetchProfileGet();
            }
        }
    });
}

//To fetch user profile using get request if post request fails
function fetchProfileGet(){
  console.log("Using GET");
  $.ajax({
        type: "GET",
        headers : {
            Authorization :'JWT '+localStorage.access_token,
            "API-KEY":"LrUyJbg2.hbzsN46K8ghSgF8LkhxgybbDnGqqYhKM"
        },
        contentType: 'application/json',
        url: 'https://backend.scrapshut.com/user/profile/',
        data: {},
        success: function (data) {
            var scrapcoins =  data.results[0].Scrapcoins;
            var id =  data.results[0].userid;
            localStorage.scrapcoins = scrapcoins;
            localStorage.userid = id;
            console.log(localStorage.scrapcoins);
            console.log(localStorage.userid);
        },
        error: function(data)
        {
            console.log(data);
        }
    });
}