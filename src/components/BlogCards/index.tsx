import React, { useState, useEffect } from 'react'
import { useArticleData } from '../../hooks/useArticle'
import { useValidation } from '../../hooks/useUser'
import './BlogCards.css'

type Props = {
    api_key: string
}

export const BlogCards = ({ api_key }: Props) => {

    const [token, updateToken] = useState<string>('')

    const { signIn } = useValidation({ updateToken })
    const { articleData } = useArticleData({ token })

    useEffect(() => {
        signIn({ api_key })
    }, [signIn, api_key])

    return (
        <section className="cards-wrapper">
            {
                articleData.map((elem, index) => {
                    
                    if(!elem.isPublish) return

                    return (
                        <div key={index} className="card-grid-space">
                            <a 
                                href="#"
                                className="card" 
                                style={{ '--bg-img': `url(${elem.image})`} as React.CSSProperties}
                            >
                                <div>
                                    <h1>{elem.title}</h1>
                                    <p>{elem.description}</p>
                                    <div className="date">{elem.date}</div>
                                    <div className="tags">
                                        {elem.keywords.map(keys => (
                                            <div className="tag">{keys}</div>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        </div>   
                    )
                })
            }
        </section>
    )
}