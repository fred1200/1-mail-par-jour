const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Cette page permet de garder l'application "réveillée"
app.get('/', (req, res) => {
  res.send('L\'application de Maria est active et opérationnelle ! 🚀');
});

app.listen(port, () => {
  console.log(`Serveur de réveil lancé sur le port ${port}`);
});
const nodemailer = require('nodemailer');
const cron = require('node-cron');

// 1. Configuration du transporteur (Utilisation de Gmail ici)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'user: process.env.EMAIL_USER', 
    pass: 'pass: process.env.EMAIL_PASS' // Ce n'est pas ton mot de passe habituel
  }
});

// 2. Liste des 30 messages (un pour chaque jour du mois)
const messages = [
  "Bonjour Maria, tu es si jolie aujourd'hui, ta douceur m'enchante.",
  "Maria, j'aime ta nature agréable et la façon dont tu es douce avec moi.",
  "Tu es magnifique Maria, j'aime savoir que tu es mienne et si dévouée.",
  "Ta soumission est une preuve de ta confiance, et cela te rend si belle.",
  "J'aime faire ce que je veux de toi, car je sais que tu t'épanouis dans mes bras.",
  // Ajoute ici les autres phrases jusqu'à 30...
];

// 3. Fonction d'envoi du mail
function envoyerMail() {
  const jourDuMois = new Date().getDate();
  const messageDuJour = messages[(jourDuMois - 1) % messages.length];

  const mailOptions = {
    from: 'user: process.env.EMAIL_USER',
    to: 'assesse.casting@gmail.com',
    subject: 'Une pensée pour toi, Maria',
    text: messageDuJour
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Erreur lors de l'envoi :", error);
    } else {
      console.log('Email envoyé avec succès : ' + info.response);
    }
  });
}

// 4. Programmation : Envoi tous les matins à 08h00
// La syntaxe '0 8 * * *' signifie : 0 minute, 8 heures, tous les jours.
cron.schedule('0 8 * * *', () => {
  console.log("Lancement de l'envoi quotidien...");
  envoyerMail();
});

console.log("L'application de Maria est lancée et attend 08h00 chaque jour.");
