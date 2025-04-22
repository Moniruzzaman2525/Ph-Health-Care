export type ICloudinaryResponse = {
    public_id: string
    version: number
    signature: string
    width: number
    height: number
    format: string
    resource_type: string
    created_at: string
    tags: string[]
    bytes: number
    type: string
    etag: string
    placeholder: boolean
    url: string
    secure_url: string
    access_mode: string
    original_filename: string
}

export type IFile = {
    fieldName: string
    originalName: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
}
