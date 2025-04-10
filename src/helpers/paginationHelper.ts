type IOpions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string
}

type IOpionsResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string
}

const calculatePagination = (options: IOpions): IOpionsResult => {
    const page = Number(options.page || 1)
    const limit = Number(options.limit || 10)
    const skip = (page - 1) * limit || 0
    const sortBy = options.sortBy || 'createdAt'
    const sortOrder = options.sortOrder || 'desc'

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}

export const paginationHelper = {
    calculatePagination
}
