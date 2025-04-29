import jwt, { Secret, SignOptions } from "jsonwebtoken";

const generateToken = (payload: any, secret: Secret, expiresIn: string | number) => {
    const token = jwt.sign(payload, secret, {
        expiresIn,
        algorithm: 'HS256'
    } as SignOptions);
    return token;
};

const verifyToken = (token: string, secret: Secret) => jwt.verify(token, secret);

export const jwtHelpers = {
    generateToken,
    verifyToken
};
