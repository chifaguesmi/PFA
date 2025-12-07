// services/AuthService.js
import Utilisateur from '../models/Utilisateur.js';
import jwt from 'jsonwebtoken';

class AuthService {
  async findUserByEmail(email) {
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      throw new Error('email introuvable');
    }
    return utilisateur;
  }

  async verifyPassword(utilisateur, mdp) {
    const isValid = await utilisateur.verifierPassword(mdp);
    if (!isValid) {
      throw new Error('mdp incorrect');
    }
  }

  async createSession(utilisateur) {
    const token = jwt.sign(
      { id: utilisateur._id, email: utilisateur.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // 7 jours
    );
    return token;
  }
}

export default new AuthService();