var proxy = require('express-http-proxy');
var express = require('express');
var cookieParser = require('cookie-parser');

// trust unsigned ssl certificate from our Jira
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var app = express();
var sesssionCookies = "";

app.use(express.static('public'));
app.use(cookieParser());
app.use('/rest', proxy('https://jiratest.uniqa.at', {
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        // set origin to jira url to bypass cross domain problem
        proxyReqOpts.headers['Origin'] = 'https://jiratest.uniqa.at';
        if(sesssionCookies) {
            proxyReqOpts.headers['cookie'] = sesssionCookies;
            // proxyReqOpts.headers['cookie'] = 'atlassian.xsrf.token=BEXG-PNX8-3TNY-YEHB|1ae21bbbfdc9d0d802629fdec07f03a69ee7ea00|lout; JSESSIONID=D4A529F9A384D208056794D1DE3E4714.jvm.jira8-tst-uniqa.t100';
        }
        //console.log(proxyReqOpts.headers);
        // you could change the path 
        // proxyReqOpts.path = 'http://dev/null'
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
        // if(proxyRes.headers['set-cookie'].length > 1) {
        //     proxyRes.headers['set-cookie'][1] = proxyRes.headers['set-cookie'][1] + "; Domain=www.miso.sk"
        // }

        // console.log(proxyRes.headers['set-cookie'][0]);
        // console.log(proxyRes.headers['set-cookie'][1]);

        return proxyResData;
        // data = JSON.parse(proxyResData.toString('utf8'));
        // data.newProperty = 'exciting data';
        // return JSON.stringify(data);
    }
}));


var server = app.listen(3000, function() {
    console.log("started on port 3000");
});