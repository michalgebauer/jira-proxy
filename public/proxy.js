$(document).ready(function() {

    $("#login").click(function(e) {
        e.preventDefault();

        var loginData = {
            username: $("#username").val(),
            password: $("#password").val()
        };

        $.ajax({
            url: "rest/rest/auth/1/session",
            type: "post",
            contentType: "application/json",
            headers: {
                "X-Atlassian-Token": "no-check"
            },
            data: JSON.stringify(loginData)
        }).done(function() {
            $.ajax({
                url: "rest/rest/api/2/myself",
                type: "get",
                dataType: "json"
            }).done(function(me) {
                $("#hello").text(me.key);
            });

            $.ajax({
                url: "rest/rest/api/2/issue/P1419-557",
                type: "get",
                dataType: "json"
            }).done(function(issue) {
                console.log(issue);
            });

            // project = P1419 AND issuetype = Activity AND status = Closed AND assignee in (currentUser())

            $.ajax({
                url: "rest/rest/api/2/search",
                type: "post",
                contentType: "application/json",
                headers: {
                    "X-Atlassian-Token": "no-check"
                },
                data: JSON.stringify({
                    "jql": "project = P1419 AND issuetype = Activity AND status = Closed AND assignee in (currentUser())",
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
            }); 
        })

    })
})