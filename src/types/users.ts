import { APIResponse } from "./api"

export type UserInfo = {
    token: {
        token: string
    }
    apiKey: {
        api_key: string
    }
    fullData: {
        id: number
        name: string
        email: string
        author: string
        api_key: string
    }
}

export type UserResponse = {
    noData: APIResponse<null>
    token: APIResponse<'token'>
    data: APIResponse< UserInfo['fullData'] >
}

export interface IUser {
    url: string
    getData: ({ token }: UserInfo['token']) =>     Promise< UserResponse['data'] >
    validate: ({ api_key }: UserInfo['apiKey']) => Promise< UserResponse['token'] >
}