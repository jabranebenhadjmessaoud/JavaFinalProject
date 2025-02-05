export interface User {

    _id?: string
    fullName?: string
    email?: string
    role?: string
    password?: string
    confirmPassword?: string
    image_url?: string | null
    createdAt?: Date
}
