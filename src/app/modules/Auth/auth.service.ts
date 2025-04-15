import { jwtHelpers } from "../../../helpers/jwtHelpers"
import prisma from "../../../helpers/prisma"
import * as bcrypt from "bcrypt"

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


    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
        id: userData.id
    }, 'accessToken', 5)

    const refreshToken = jwtHelpers.generateToken({
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

const refreshToken = async (token: string) => {
    let decodedData
   try {
       decodedData = jwtHelpers.verifyToken(token, 'secretToken')

       const userData = await prisma.user.findUniqueOrThrow({
           where: {
               email: decodedData.email
           }
       })
       const accessToken = jwtHelpers.generateToken({
           email: userData.email,
           role: userData.role,
           id: userData.id
       }, 'accessToken', 5)
       return {
           accessToken,
           needPasswordChange: userData.needPasswordChange
       }
   } catch (error) {
    throw new Error("Your are not authorized")
   }
}

export const authServices = {
    loginUser,
    refreshToken
}
