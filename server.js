const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('.'));

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 150
        })
    });

    const data = await openAIResponse.json();

    if (!data.choices || data.choices.length === 0) {
        console.error('OpenAI API response:', data);
        return res.status(500).json({ reply: 'Sorry, I am unable to process your request at the moment.' });
    }

    const botReply = data.choices[0].text.trim();

    res.json({ reply: botReply });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 