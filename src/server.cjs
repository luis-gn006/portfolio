require('dotenv').config({path:'../.env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Resend }  = require('resend');

const app = express();
const PORT  = process.env.PORT || 3000;
const resend = new Resend(process.env.RESEND_API_KEY);

const whiteList = ['http://localhost:4321', 'https://luis-gn006.github.io/portfolio/index.html',]

app.use(cors({ origin: whiteList, methods: ['POST'] }));
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { email, message } = req.body;
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [process.env.EMAIL],
            subject: 'Trabajemos juntos',
            html: `<h2>${email}</h2> <p>${message}</p>`,
        });
        res.status(200).send('Email enviado correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el email');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});