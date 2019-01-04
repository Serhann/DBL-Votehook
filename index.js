const authorizationKey = '',
      webhookID = '',
      webhookToken = '';

const express = require('express'), // DO NOT TRY TO CHANGE THIS LINE IF YOU CHANGE THIS LINE VOTEHOOK WILL DIE!
      app = express(), // DO NOT TRY TO CHANGE THIS LINE IF YOU CHANGE THIS LINE VOTEHOOK WILL DIE!
      bodyParser = require('body-parser'), // DO NOT TRY TO CHANGE THIS LINE IF YOU CHANGE THIS LINE VOTEHOOK WILL DIE!
      morgan = require('morgan'), // DO NOT TRY TO CHANGE THIS LINE IF YOU CHANGE THIS LINE VOTEHOOK WILL DIE!
      { RichEmbed } = require('discord.js'), // DO NOT TRY TO CHANGE THIS LINE IF YOU CHANGE THIS LINE VOTEHOOK WILL DIE!
      { WebhookClient } = require('discord.js'), // DO NOT TRY TO CHANGE THIS LINE IF YOU CHANGE THIS LINE VOTEHOOK WILL DIE!
      hook = new WebhookClient(webhookID, webhookToken); // DO NOT TRY TO CHANGE THIS LINE IF YOU CHANGE THIS LINE VOTEHOOK WILL DIE!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.post('/vote', (req, res) => {
    var authorization = req.headers.authorization;
      
    var bot = req.body.bot;
    var user = req.body.user;
    var type = req.body.type;

    if (bot === undefined || user === undefined || type === undefined || authorization) return {
        res.setHeader('Content-Type', 'text/plain'); 
        res.statusCode = 403;
        res.end('MISSING_PARAMS'); 
    };
      
    if (authorization !== authorizationKey) return {
        res.setHeader('Content-Type', 'text/plain'); 
        res.statusCode = 403;
        res.end('WRONG_SECRET'); 
    };

    if (type === 'upvote') {
        var embed = new RichEmbed({
            color: 3447003,
            title: `Yeni bir oy alındı!`,
            description: `<@${user}> bota DBL üzerinde bir oy verdi!`,
            timestamp: new Date()
        });
        
        hook.send({ embeds: [embed] });

        res.statusCode = 200; 
        return res.end('OK');

    } else if (type === 'test') {
        var embed = new RichEmbed({
            color: 3447003,
            title: `Başarılı!`,
            description: `DBL test başarılı Votehook düzgün şekilde çalışıyor!`,
            timestamp: new Date()
        });
        
        hook.send({ embeds: [embed] });

        res.statusCode = 200; 
        return res.end('OK');

    }

})

app.listen('80', () => console.log('Live on 80!'))
