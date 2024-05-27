/* eslint-disable consistent-return */

import jwt from "jsonwebtoken";

// Fonction pour générer un token JWT
export function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWTSECRETKEY, {
    expiresIn: "1h",
  });
}

// Fonction pour vérifier et décoder un token JWT
export function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token manquant" });
  }

  jwt.verify(token, process.env.JWTSECRETKEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token invalide" });
    }

    req.user = decoded;
    next(); // Ajoute les données de l'utilisateur décodé à l'objet req
  });
}
