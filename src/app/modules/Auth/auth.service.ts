import prisma from "../../../helpers/prisma"


const loginUser = async (data: {
    email: string,
    password: string
}) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: data.email
        }
    })
    return userData
}


export const authServices = {
    loginUser
}
