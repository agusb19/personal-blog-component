import { Article } from '../services/articles'
import { useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { dateConfig } from '../utils/config'

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

    const dataResult = useMemo(() => {
        return data?.success ? data.result.data.map(elem => {

            const dateConverted = new Date(elem.updated_at)
            const dateNormalized = dateConverted.toLocaleDateString('en-US', dateConfig)

            return {
                id: elem.id,
                title: elem.title,
                image: elem.image,
                description: elem.description,
                keywords: elem.keywords.split(', '),
                isPublish: elem.is_publish,
                date: dateNormalized
            }
        }) : []

    }, [data])

    useEffect(() => {
        
        if(isError) {
            console.error('Internal error, please try again')
        }

        if(!isError && !isLoading && !isPending && !data.success) {
            console.error(`Failed to get user data, message: ${data.error.message}`)
        }

    }, [isPending, isLoading, isError, data])

    return {
        articleData: dataResult,
        refetchArticles: refetch
    }
} 