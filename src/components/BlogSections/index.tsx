import { useMemo, useContext } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context/globalContext"
import { useSectionData } from "../../hooks/useSection"
import './BlogSections.css'

export function BlogSections() {

    const { article } = useParams()
    const { token, articleData } = useContext(GlobalContext)

    const currentArticle = useMemo(() => {
        return articleData.find(elem => elem.title === article?.replace(/-/g, " ")) ?? null
    }, [article, articleData])

    const { sectionData } = useSectionData({ token, article_id: currentArticle?.id ?? '' })
    
    return (
        <section className="main-section-article">
            {
                sectionData.map(elem => (
                    <p key={elem.id} style={elem.styles as React.CSSProperties}>
                        {
                            elem.content.split('\n').map((lines, index) => (
                                <span key={index} className='block mb-3'> {lines} </span>
                            ))
                        }
                    </p>
                ))
            } 
        </section>
    )
}