export default function isAdmin(req, res, next) {
  // Vérifier si l'utilisateur est authentifié et a le statut d'administrateur
  if (req.user && req.user.role === 'admin') {
    // Si l'utilisateur est administrateur, passer la demande au prochain middleware
    return next();
  }
  // Sinon, renvoyer une réponse d'erreur d'accès refusé
  return res.status(403).json({ message: "Accès refusé. Vous n'avez pas les autorisations nécéssaire pour accéder à cette requête" });
}
