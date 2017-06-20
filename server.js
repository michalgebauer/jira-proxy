var proxy = require('express-http-proxy');
var express = require('express');
var cookieParser = require('cookie-parser');

// trust unsigned ssl certificate from our Jira
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var app = express();

var sesssionCookies = {
    jsessionid: "",
    xsrfToken: ""
}

app.use(express.static('public'));
app.use(cookieParser());
app.use('/proxy', proxy('https://jiratest.uniqa.at', {
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        // set origin to jira url to bypass cross domain problem
        proxyReqOpts.headers['Origin'] = 'https://jiratest.uniqa.at';

        var cookies = [];
        for(cookie in sesssionCookies) {
            cookies.push(sesssionCookies[cookie]);
        }
        if(cookies.length) {
            proxyReqOpts.headers['cookie'] = cookies.join(";");
        }

        // proxyReqOpts['path'] = '/rest' + proxyReqOpts.path;
        // proxyReqOpts.params['path'] = proxyReqOpts.path;
        return proxyReqOpts;
    },
    userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
        if(proxyRes.headers['set-cookie']) {
            proxyRes.headers['set-cookie'].forEach(function(cookie) {
                if(cookie.indexOf("JSESSIONID=") != -1) {
                    sesssionCookies.jsessionid = cookie.split(";")[0];
                }
                if(cookie.indexOf("atlassian.xsrf.token=") != -1) {
                    sesssionCookies.xsrfToken = cookie.split(";")[0];
                }
            });
        }

        // function must return data
        return proxyResData;
    }
}));

app.get("/get", function(req, res) {
    console.log(req.params.a);
});


var server = app.listen(3000, function() {
    console.log("started on port 3000");
});