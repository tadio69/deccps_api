const jwt = require ('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'ent-tête de la requête.`
        return res.status(401).json({ message })
    }

    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if (error) {
            const message = `L'utlisateur n'est pas autorisé à accéder à cette ressource.`
            return res.status(401).json({ message, data: error })
        }

        const userId = decodedToken.userId       
        if (req.body.userId && req.body.userId !== userId) {
            const message = `L'identifiant de l'utilisateur est invalide.`
            res.status(401).json({ message })
        }else{
            next()
        }
    })
}