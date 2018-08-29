const express = require('express');
const app = express();
const port = process.env.PORT || 3009;
const timeout = require('connect-timeout');
const cors = require('cors');

app.use(timeout('5s'));
app.use(haltOnTimedout);
app.use(cors());

function haltOnTimedout (req, res, next) {
    if (!req.timedout) next();
}

app.get('/', (req, res) => {
    res.send({
      'text': `Beer time? It’s always beer time!`
    });
});

app.post('/beer-time', (req, res) => {
    res.send({
        'response_type': 'in_channel',
        'text': `Beer time? It’s always beer time! :beers:`,
    });
});

app.use((err, req, res, next) => {
    if (err.error){
        res.status(err.error.status || 500)
    }
    res.json(err);
});

app.use((req, res, next) => {
    res.status(404).json({
        error: {
            status: 404,
            message: 'Ooops, not found!'
        }
    });
});

app.listen(port, () => console.log('Magic is happening on ' + port));
