$(document).ready(function() {
    $("#rest-send").click(function(e) {
        e.preventDefault();

        var params = $("#rest-params").val();
        var json = JSON.parse(params);

        $.ajax({
            url: "/proxy" + $("#rest-url").val(),
            type: $("#rest-type").val(),
            contentType: "application/json",
            headers: {
                "X-Atlassian-Token": "no-check"
            },
            dataType: "json",
            data: json || {}
        }).done(function(response) {
            console.log(response);
        });
    })
});