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

let searchFun = function(event) {

    let payload = $(this).val();
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
                let tags = data.results[i].tags.toString();
                $("#Result").append(
                    `<div class="card mt-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-8"><a href="${data.results[i].url}"><p>Title: ${data.results[i].title}</p></a></div>
                            <div class="col-md-4">Rating: ${data.results[i].rate}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4"> Author: ${data.results[i].author}</div>
                            <div class="col-md-4"> Review: ${data.results[i].review}</div>
                            <div class="col-md-4">Tags: ${tags}</div>
                        </div>
                    </div>
                </div>`
                );
            }
        }
    });
};

$(function() {
    $("#searchField").keyup(searchFun);
});
