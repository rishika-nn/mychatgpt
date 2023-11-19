const { OpenAI } = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const openai = new OpenAI({
    organization: "org-i16GdI3biVetsydNnhzCYRLs",
    apiKey: "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",
});

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required in the request body.' });
        }

        const response = await openai.chat.completions.create({
            model: 'text-davinci-003',
            prompt: `${message}`,
            max_tokens: 100,
            temperature: 0.5,
        });

        res.json({
            message: response.data.choices[0].text,
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
