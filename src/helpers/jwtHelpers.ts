import jwt, { Secret } from "jsonwebtoken"

const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
    const token = jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: expiresIn
    })
    return token
}

const verifyToken = (token: string, secret: Secret) => jwt.verify(token, secret)

export const jwtHelpers = {
    generateToken,
    verifyToken
}
