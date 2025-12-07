const mongoose = require('mongoose');
const Utilisateur = require('./models/Utilisateur');
const Session = require('./models/Session');

async function start() {
    try {
        await mongoose.connect("mongodb://localhost:27017/test");
        console.log("Connected");

        // Create user
        const u = await Utilisateur.create({
            nom: "test",
            email: "test@test.com",
            password: "1234"
        });

        console.log("User created:", u);

        // Create session for that user
        const s = await Session.create({
            utilisateurId: u._id
        });

        console.log("Session created:", s);

        // Close the connection after test
        mongoose.connection.close();

    } catch (err) {
        console.error(err);
    }
}

start();
