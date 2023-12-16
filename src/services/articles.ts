import { addPath, PATHS, API_URL } from "../utils/config"
import type { IArticle, ArticleInfo, ArticleResponse } from "../types/articles"

export class Article implements IArticle {
    url: string

    constructor() {
        this.url = addPath(PATHS.ARTICLE, API_URL)
    }

    getData = async ({ token }: ArticleInfo['token']) => {
        const options = {
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            })
        }

        const response = await fetch(this.url, options)
        return await response.json() as ArticleResponse['data']
    }
}