import prisma from "../../../helpers/prisma"
import * as bcrypt from "bcrypt"
import { access } from "fs"
import jwt from "jsonwebtoken"


const generateToken = (payload: any, secret: string, expiresIn: number) => {
    const token = jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: expiresIn
    })
    return token
}

const loginUser = async (payload: {
    email: string,
    password: string
}) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    })
    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password)

    if (!isCorrectPassword) {
        throw new Error("Invalid password")
    }


    const accessToken = generateToken({
        email: userData.email,
        role: userData.role,
        id: userData.id
    }, 'secretToken', 5)

    const refreshToken = generateToken({
        email: userData.email,
        role: userData.role,
        id: userData.id
    }, 'secretToken', 30)

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    }
}


export const authServices = {
    loginUser
}
