import { GlobalContext } from './globalContext'
import { useValidation } from '../hooks/useUser'
import { useArticleData } from '../hooks/useArticle'
import { useState, useEffect, type ReactNode } from 'react'

type Props = {
    api_key: string
    children: ReactNode
}

export function GlobalProvider({ api_key, children }: Props) {

    const [token, setToken] = useState<string>('')
    
    const { articleData } = useArticleData({ token })
    const { signIn, isPending } = useValidation({ updateToken: setToken })

    useEffect(() => {
        if(!isPending) signIn({ api_key })
    }, [signIn, api_key]) //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <GlobalContext.Provider value={{ token, articleData }}>
            {children}
        </GlobalContext.Provider>
    )
}