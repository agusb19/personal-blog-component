import { createContext } from "react"
import { type ProcessedArticle } from '../types/articles'

type Context = {
    token: string
    articleData: ProcessedArticle[] | []
}

export const GlobalContext = createContext<Context>({ 
    token: '', 
    articleData: []
})