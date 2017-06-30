var proxyServer = {
    _default: {
        startInterval: false,
        hideAfterLogin: false,
        onLogin: null
    },

    myself: {},

    init: function(param) {
        var options = $.extend({}, this._default, param);

        $("head").append("<style>.jira-proxy-login { border-radius: 4px 4px 4px 4px;border-width: 1px;margin-left: auto;margin-right: auto;width: 460px;padding: 20px;} "
            + "#loginMessage {margin-bottom: 15px;}</style>");

        var $loginWrapper = $("<div>", {
            id: "proxy-login-wrapper"
        });
        $("body").prepend($loginWrapper);
        $loginWrapper.load("/proxy-login.html");
        // check if you are logged in
        this.proxyLoginCheck();

        var self = this;
        $("#proxy-login-wrapper").on("click", "#proxy-login-button", function(e) {
            e.preventDefault();

            var loginData = {
                username: $("#username").val(),
                password: $("#password").val()
            };

            $.ajax({
                url: "/proxy/rest/auth/1/session",
                type: "post",
                contentType: "application/json",
                headers: {
                    "X-Atlassian-Token": "no-check"
                },
                data: JSON.stringify(loginData)
            }).done(function() {
                self.proxyLoginCheck();
            });
        })

        if(options.startInterval) {
            this.startCheck();
        }
        if(options.hideAfterLogin) {
            //
        }
    },

    startCheck: function() {
        var intervalCheck = setInterval(this.proxyLoginCheck, 1000 * 10);
    },

    stopCheck: function() {
        clearInterval(intervalCheck);
    },

    proxyLoginCheck: function() {
        var intervalCheck;

        $("#loginMessage").html("");

        var self = this;
        $.ajax({
            url: "/proxy/rest/api/2/myself",
            type: "get",
            dataType: "json"
        }).done(function(me) {
            AJS.messages.success("#loginMessage", {
                body: '<p> You are logged in as <strong>' + me.key + '</strong> (<a href="#">check</a>).</p>',
                closeable: false
            });
            self.myself = me;
            AJS.params.loggedInUser = proxyServer.myself.key;
            $("#proxy-login-wrapper").slideUp(1000);
        }).fail(function() {
            AJS.messages.warning("#loginMessage", {
                body: '<p>You must log in to access this page (<a href="#">check</a>).</p>',
                closeable: false
            });
        }).always(function() {
            $("#loginMessage a").click(function(e) {
                e.preventDefault();
                proxyLoginCheck();
            });
        });
    }
}

$(document).ready(function() {
    proxyServer.init({
        onLogin: function() {
            AJS.params.loggedInUser = proxyServer.myself.key;
        },
        hideAfterLogin: true
    });
});