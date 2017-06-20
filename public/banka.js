$.ajax({
    url: "https://www.postovabanka.sk/svc/banka/getrates",
    type: "get",
    //dataType: "jsonp"
}).done(function(result) {
    console.log("result" + result);
}).fail(function( jqXHR, textStatus, errorThrown) {
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
});
