import { addPath, PATHS, API_URL } from "../utils/config"
import type { ISection, SectionInfo, SectionResponse } from "../types/sections"

export class Section implements ISection {
    url: string

    constructor() {
        this.url = addPath(PATHS.SECTION, API_URL)
    }

    getData = async ({ article_id, token }: SectionInfo['articleId']) => {
        const url = new URL(this.url)
        
        url.searchParams.append('article_id_query', article_id)
        
        const options = {
            headers: new Headers({'Authorization': `Bearer ${token}`}),
        }
        
        const response = await fetch(url, options)
        return await response.json() as SectionResponse['data']
    } 
}