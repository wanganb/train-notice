var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var noticeUrl = 'http://www.12306.cn/mormhweb/zxdt/index_zxdt.html';

function fetchNoticePage(url) {
    http.get(url, function (res) {
        var html = '';
        var notices = '';
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            html += chunk;
        });
        res.on('end', function () {
            var $ = cheerio.load(html);
            var newes = $('#newList a').toArray();
            var times = $('#newList .zxdt_time_in').toArray();
            var today = formatDate(new Date());
            newes.forEach(function (el, index) {
                if($(times[index]).text().indexOf(today)>=0){
                    console.log($(times[index]).text() + '---' + $(el).text());
                }
            });
        });
    })
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

fetchNoticePage(noticeUrl);