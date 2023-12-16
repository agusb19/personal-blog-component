import { type APIResponse } from "./api"

export type ContentType = 
'image' |
'title' |
'subtitle' |
'paragraph' |
'blockquote' |
'javascript' |
'typescript' |
'jsx'

export type RawSection = {
    content: string 
    content_type: ContentType
    image_url: string | null
    text_color: string
    width: string
    height: string
    font_size: string
    margin_top: string 
    text_align: string 
    font_weight: string 
    font_family: string 
    line_height: string 
    border_radius: string 
}

export type Styles = {
    color: string
    width: string
    height: string
    fontSize: string 
    marginTop: string
    textAlign: string 
    fontWeight: string 
    fontFamily: string 
    lineHeight: string 
    borderRadius: string 
}

export type ProcessedSection = {
    id: number
    content: string
    content_type: ContentType
    image_url: string | null
    styles: Styles
}

export type SectionInfo = {
    articleId: {
        article_id: string //Type of string due to the searchParams.append functionality 
        token: string
    }

    idData: RawSection & { 
        id: number 
        token: string
    } 
}

export type SectionResponse = {
    data: APIResponse< SectionInfo['idData'] > // It doesn't contemplate the sequence field
}

export interface ISection {
    url: string
    getData: ({ article_id, token }: SectionInfo['articleId']) => Promise< SectionResponse['data'] >
}