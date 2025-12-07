// controllers/AuthController.js
import AuthService from '../services/AuthService.js';

export const login = async (req, res) => {
  try {
    const { email, mdp } = req.body; 

    const utilisateur = await AuthService.findUserByEmail(email);
    await AuthService.verifyPassword(utilisateur, mdp);
    const token = await AuthService.createSession(utilisateur);

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (err) {
    if (err.message === 'email introuvable') {
      return res.status(404).json({ message: 'Utilisateur inexistant' });
    }
    if (err.message === 'mdp incorrect') {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
};