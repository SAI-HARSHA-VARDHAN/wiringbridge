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
    data.tags = data.tags.split(', ')
    data.anonymous = 'false'
    data.fake = 'false'
    console.log(data)
    data1 = data;

    $.ajax({
        type: "POST",
        headers : {
            Authorization : 'JWT ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImFiaGlzaGVrcmFqMjcyQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWJoaXNoZWtyYWoyNzIiLCJleHAiOjE1OTE2Mjg5OTN9.tRHeI1mQdLdYqQ12xHdw6hmIpGajdv5nVc7WPlSGNag'
        },
        contentType : 'application/json',
        url: 'https://backend.scrapshut.com/api/post/',
        data: data,
        success: function(data)
        {
            alert(success); 
        }
      });
 
    e.preventDefault();
});