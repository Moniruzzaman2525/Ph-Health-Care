import { JwtPayload, Secret } from "jsonwebtoken"
import config from "../../../config"
import { jwtHelpers } from "../../../helpers/jwtHelpers"
import prisma from "../../../helpers/prisma"
import * as bcrypt from "bcrypt"
import { UserStatus } from "@prisma/client"
import emailSender from "./emailSender"

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

    const expire_in = Number(config.jwt.expires_in);
    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
        id: userData.id
    }, config.jwt.jwt_secret as Secret, expire_in)

    const refresh_token_expires_in = Number(config.jwt.refresh_token_expires_in)

    const refreshToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
        id: userData.id
    }, config.jwt.refresh_token_secret as Secret, refresh_token_expires_in)

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange
    }
}

const refreshToken = async (token: string) => {
    let decodedData
    try {
        decodedData = jwtHelpers.verifyToken(token, 'secretToken') as JwtPayload

        const userData = await prisma.user.findUniqueOrThrow({
            where: {
                email: decodedData.email
            }
        })
        const expire_in = Number(config.jwt.expires_in);
        const accessToken = jwtHelpers.generateToken({
            email: userData.email,
            role: userData.role,
            id: userData.id
        }, config.jwt.jwt_secret as Secret, expire_in)
        return {
            accessToken,
            needPasswordChange: userData.needPasswordChange
        }
    } catch (error) {
        throw new Error("Your are not authorized")
    }
}


const changePassword = async (user: any, payload: any) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: UserStatus.ACTIVE
        }
    })
    const isCorrectPassword: boolean = await bcrypt.compare(payload.oldPassword, userData.password)

    if (!isCorrectPassword) {
        throw new Error("Invalid password")
    }

    const hashPassword: string = await bcrypt.hash(payload.newPassword.password, 12)
    await prisma.user.update({
        where: {
            email: userData.email
        },
        data: {
            password: hashPassword,
            needPasswordChange: false
        }
    })

    return {
        message: 'Password changes successfully'
    }

}

const forgotPassword = async (payload: {email: string}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })
    const resetPasswordExpireIn = Number(config.jwt.reset_password_token_expire_in)
    const resetPassToken = jwtHelpers.generateToken({ email: userData.email, role: userData.role }, config.jwt.reset_password_secret as Secret, resetPasswordExpireIn)
    const resetPasswordLink = config.jwt.reset_password_link + `?email=${userData.email}&token=${resetPassToken}`
    await emailSender(
        userData.email,
        `
        <div>
            <p>Dear User,</p>
            <p>Your password reset link
                <a href={${resetPasswordLink}}>
                    <button>Reset Password</button>
                </a>
            </p>
        </div>
        `
    )
}

export const authServices = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword
}
