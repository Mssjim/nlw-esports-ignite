import express from 'express';
const app = express();

app.get('/games', (req, res) => {
    return res.status(200).json([]);
});

app.get('/games/:id/ads', (req, res)=>{
    const id = req.params.id;
    return res.status(200).json([]);
});

app.post('/ads', (req, res) => {
    return res.status(201).send([]);
});

app.get('/ads/:id/discord', (req, res) => {
    return res.status(200).send([]);
});

app.listen(3333);