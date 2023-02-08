export interface User {
    email: String,
    password: String,
    returnSecureToken?: boolean
}

export interface FbAuthResponse {
    idToken: string
    expiresIn: string
}

export interface Post {
    id?: string
    title: string
    text: string
    author: string
    date: Date
}

export interface FbCreateResponse {
    name: string
}