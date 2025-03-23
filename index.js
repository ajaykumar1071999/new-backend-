const express = require('express');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server Started');
});

app.get('/api', (req, res) => {

    res.json({
        message: 'Welcome to the API',
        version: '1.0.0'
    })
})

app.get('/api/jokes', (req, res) => {

    res.json({
        id: 1,
        joke: 'Why did the scarecrow win an award? Because he was outstanding in his field.'

    },
        {
            id: 2,
            joke: 'Why did the scarecrow win an award? Because he was outstanding in his field.'
        },
        {
        id: 3,
        joke: 'Why did the scarecrow win an award? Because he was outstanding in his field.'
        },
        {
            id: 4,
            joke: 'Why did the scarecrow win an award? Because he was outstanding in his field.'
        }
    )
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
