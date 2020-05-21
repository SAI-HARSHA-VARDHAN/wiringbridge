let data1;
$('#formId').on('submit', function( e ){ 
    var form = $( this ), // this will resolve to the form submitted
        action = form.attr( 'action' ),
          type = form.attr( 'method' ),
          data = {};
 
      // Make sure you use the 'name' field on the inputs you want to grab. 
    form.find( '[name]' ).each( function( i , v ){
       var input = $( this ), // resolves to current input element.
           name = input.attr( 'name' ),
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
            Authorization :'JWT '+localStorage.access_token
        },
        contentType : 'application/json',
        url: 'https://backend.scrapshut.com/api/post/',
        data: data,
        success: function(data)
        {
            console.log(data); 
        },
        error: function(data)
        {
            console.log(data); 
        }
      });
 
    e.preventDefault();
});