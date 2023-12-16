import { Section } from '../services/sections'
import { useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { SectionInfo, ProcessedSection } from '../types/sections'

const sectionService = new Section()

export const useSectionData = ({ token, article_id }: SectionInfo['articleId']) => {

    const { data, isPending, isLoading, isError, refetch } = useQuery({
        queryKey: ['section', 'data', token, article_id],
        queryFn: ({ queryKey }) => sectionService.getData({ 
            token: queryKey[2], 
            article_id: queryKey[3]
        }),

        enabled: article_id !== '',
        staleTime: Infinity
    })

    const dataResult: ProcessedSection[] | [] = useMemo(() => {
        return data?.success ? data.result.data.map(elem => {

            return {
                id: elem.id,
                content: elem.content,
                content_type: elem.content_type,
                image_url: elem.image_url,
                styles: {
                    width: elem.width,
                    height: elem.height,
                    color: elem.text_color,
                    fontSize: elem.font_size, 
                    marginTop: elem.margin_top, 
                    textAlign: elem.text_align,
                    fontWeight: elem.font_weight,
                    fontFamily: elem.font_family,
                    lineHeight: elem.line_height,
                    borderRadius: elem.border_radius
                } 
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
        sectionData: dataResult,
        refetch
    }
} 