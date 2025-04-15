import prisma from "../../../helpers/prisma"
import * as bcrypt from "bcrypt"

const loginUser = async (data: {
    email: string,
    password: string
}) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: data.email
        }
    })
    const isCorrectPassword = await bcrypt.compare(data.password, userData.password)
    return userData
}


export const authServices = {
    loginUser
}
