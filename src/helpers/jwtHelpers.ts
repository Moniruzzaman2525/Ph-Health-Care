import jwt from "jsonwebtoken"

const generateToken = (payload: any, secret: string, expiresIn: number) => {
    const token = jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: expiresIn
    })
    return token
}

const verifyToken = (token: string, secret: string) => jwt.verify(token, secret)

export const jwtHelpers = {
    generateToken,
    verifyToken
}
