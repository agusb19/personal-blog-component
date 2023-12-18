import React, { useContext } from 'react'
import { GlobalContext } from '../../context/globalContext'
import { useNavigate } from 'react-router-dom'
import './BlogCards.css'

export const BlogCards = () => {

    const navigate = useNavigate()
    const { articleData } = useContext(GlobalContext)

    const selectArticle = (articleName: string) => {
        navigate(`/blog-posts/${articleName.replace(/\s/g, "-")}`)
    }

    return (
        <section className="cards-wrapper">
            {
                articleData.map((elem, index) => {
                    
                    if(!elem.isPublish) return

                    return (
                        <div 
                            key={index} 
                            className="card-grid-space" 
                            onClick={() => selectArticle(elem.title)}
                        >
                            <a 
                                className="card" 
                                style={{ '--bg-img': `url(${elem.image})`} as React.CSSProperties}
                            >
                                <div>
                                    <h1>{elem.title}</h1>
                                    <p>{elem.description}</p>
                                    <div className="date">{elem.date}</div>
                                    <div className="tags">
                                        {elem.keywords.map(keys => (
                                            <div className="tag" key={keys}>{keys}</div>
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