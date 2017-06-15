var proxy = require('express-http-proxy');
var express = require('express');
var cookieParser = require('cookie-parser');

// trust unsigned ssl certificate from our Jira
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var app = express();
var sesssionCookies = "";

app.use(express.static('public'));
app.use(cookieParser());
app.use('/proxy', proxy('https://jiratest.uniqa.at', {
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        // set origin to jira url to bypass cross domain problem
        proxyReqOpts.headers['Origin'] = 'https://jiratest.uniqa.at';
        if(sesssionCookies) {
            proxyReqOpts.headers['cookie'] = sesssionCookies;
        }
        // proxyReqOpts['path'] = '/rest' + proxyReqOpts.path;
        // proxyReqOpts.params['path'] = proxyReqOpts.path;
        return proxyReqOpts;
    },
    userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
        var newSessionCookies = [];

        if(proxyRes.headers['set-cookie']) {
            proxyRes.headers['set-cookie'].forEach(function(cookie) {
                if(cookie.indexOf("JSESSIONID=") != -1 || cookie.indexOf("atlassian.xsrf.token=") != -1) {
                    newSessionCookies.push(cookie.split(";")[0]);
                }
            });
        }

        if(newSessionCookies.length) {
            sesssionCookies = newSessionCookies.join(";");
        }

        // function must return data
        return proxyResData;
    }
}));


var server = app.listen(3000, function() {
    console.log("started on port 3000");
});