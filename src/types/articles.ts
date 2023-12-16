import { type APIResponse } from "./api"

export type ArticleInfo = {
    token: {
        token: string
    }
    fullData: {
        id: number
        user_id: number
        name: string
        title: string
        keywords: string
        description: string
        image: string | null
        is_publish: boolean
        created_at: string  //Type of string due to the way that mysql returns the value
        updated_at: string  //Type of string due to the way that mysql returns the value
    } 
}

export type ArticleResponse = {
    data: APIResponse< ArticleInfo['fullData'] >
}

export interface IArticle {
    url: string
    getData: ({ token }: ArticleInfo['token']) => Promise< ArticleResponse['data'] >
}