import { Article } from '../services/articles'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

const articleService = new Article()

type UseArticleData = {
    token: string
}

export const useArticleData = ({ token }: UseArticleData) => {

    const { data, isPending, isLoading, isError, refetch } = useQuery({
        queryKey: ['article', 'data', token],
        queryFn: ({ queryKey }) => articleService.getData({ token: queryKey[2] }),
        
        staleTime: Infinity,
        enabled: token !== ''
    })

    useEffect(() => {
        
        if(isError) {
            console.error('Internal error, please try again')
        }

        if(!isError && !isLoading && !isPending && !data.success) {
            console.error(`Failed to get user data, message: ${data.error.message}`)
        }

    }, [isPending, isLoading, isError, data])

    return {
        articleData: data?.success ? data.result.data : [],
        refetchArticles: refetch
    }
} 