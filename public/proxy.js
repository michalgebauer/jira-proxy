$(document).ready(function() {
    $("#searchButton").click(function(e) {
        e.preventDefault();

        $.ajax({
            url: "proxy/rest/api/2/search",
            type: "post",
            contentType: "application/json",
            headers: {
                "X-Atlassian-Token": "no-check"
            },
            data: JSON.stringify({
                "jql": $("#jql").val(),
                "startAt": 0,
                "maxResults": 15,
                "fields": [
                    "summary",
                    "status",
                    "assignee"
                ]
            }),
            dataType: "json"
        }).done(function(result) {
            console.log(result);
            
            // vymaz obsah tabulky:
            var $table = $("#search tbody");
            $("tr", $table).remove();

            result.issues.forEach(function(issue) {

                var $tr = $("<tr>");

                $tr.append("<td><a href='/browse/" + issue.key +"'>" + issue.key + "</a></td>");
                $tr.append("<td>" + issue.fields.assignee.displayName + "</td>");
                $tr.append("<td>" + issue.fields.summary + "</td>");

                $table.append($tr);
            });
        }); 
    })
})