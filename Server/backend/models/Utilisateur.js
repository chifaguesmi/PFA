// models/Utilisateur.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const utilisateurSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  // Ajoute d'autres champs si besoin (ex: role, adresse), mais reste minimal pour l'auth
}, { timestamps: true });

// Méthode d'instance pour vérifier le mot de passe (comme dans le diagramme)
utilisateurSchema.methods.verifierPassword = async function (mdp) {
  return bcrypt.compare(mdp, this.passwordHash);
};

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

export default Utilisateur;