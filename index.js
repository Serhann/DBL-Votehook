const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      dblIP = '178.62.19.159', //dont change this
      authorizationKey = '',
      { RichEmbed } = require('discord.js'),
      { WebhookClient } = require('discord.js'),
      webhookID = '';
      webhookToken = '';
      hook = new WebhookClient(webhookID, webhookToken);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

var lastUserUpvote;
var lastUserNone;

app.post('/vote', (req, res) => {
    var authorization = req.headers.authorization;
    console.log(authorization)
    console.log(authorizationKey)
    var bot = req.body.bot;
    var user = req.body.user;
    var type = req.body.type;

    if (req.ip ==! dblIP || authorization != authorizationKey) {
        res.setHeader('Content-Type', 'text/plain'); 
        res.statusCode = 403; 
        return res.end('ITS_NOT_DBL')
    }

    if (bot == undefined || user == undefined || type == undefined) {
        res.setHeader('Content-Type', 'text/plain'); 
        res.statusCode = 403;
        return res.end('MISSING_PARAMS'); 
    };

    if (type === 'upvote' && lastUserUpvote !== user) {
        lastUserUpvote = user;
        var embed = new RichEmbed({
            color: 3447003,
            title: `Yeni bir oy alındı!`,
            description: `<@${user}> bota DBL üzerinde bir oy verdi!`,
            timestamp: new Date()
        });
        
        hook.send({ embeds: [embed] });

        res.statusCode = 200; 
        return res.end('OK');

    } else if (type === 'none' && lastUserNone !== user) {
        lastUserNone = user;
        var embed = new RichEmbed({
            color: 3447003,
            title: `Birisi verdiği oyu geri aldı!`,
            description: `<@${user}> bota DBL üzerinde verdiği oyu geri aldı!`,
            timestamp: new Date()
        });
        
        hook.send({ embeds: [embed] });

        res.statusCode = 200; 
        return res.end('OK');
    }

})

app.listen('80', () => console.log('Live on 80!'))
