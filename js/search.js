function get_query() {
    return location.search.slice(8, location.search.length)
}

let queries = get_query();
$(document).ready(function () {
    $.getJSON("https://backend.scrapshut.com/api/post/?search=" + get_query(), function (data) {
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
    });
});

$(document).ready(function() {
    document.getElementById("textIn").value = queries;
});