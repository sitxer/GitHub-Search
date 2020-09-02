/* eslint-disable react-hooks/exhaustive-deps,camelcase */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'

import { searchRepo } from '../../api'
import './style.scss'

// ** name, stargazers_count, updated_at, language, owner.avatar_url, owner.html_url, owner.login, description ** //

const Card = () => {
    const { name } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [cardInfo, setCardInfo] = useState()

    useEffect(() => {
        Promise.resolve(searchRepo(name, 1, 1)).then((response) => {
            setIsLoaded(true)
            setCardInfo(response.items[0])
        })
    }, [])

    const render = () => {
        const { stargazers_count, updated_at, language, description } = cardInfo
        const { avatar_url, html_url, login } = cardInfo.owner

        const date = moment(updated_at).format('D MMM')

        return (
            <div className="Card__wrapper">
                <div className="Card__user">
                    <img src={avatar_url} alt="user_info" className="Card__user-img" />
                    <a href={html_url} target="_blank" rel="noopener noreferrer">
                        {login}
                    </a>
                </div>
                <div>
                    <span className="card__name">{name}</span>
                    <span>
                        <svg
                            className="Home__list-stars-icon"
                            viewBox="0 0 16 16"
                            version="1.1"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                            />
                        </svg>
                        {stargazers_count}
                    </span>
                    <span>{date}</span>
                    <span>{language}</span>
                    <span>{description}</span>
                </div>
            </div>
        )
    }

    return (
        <>
            <Link className="Card__back-button" to={{ pathname: '/' }}>
                На главную
            </Link>
            {cardInfo && isLoaded ? render() : <div>Загрузка...</div>}
        </>
    )
}

export default Card
