import React, {useState} from 'react';

import './Card.scss'

function Card({id, onPlus, onFavorite, title, price, imageUrl, favorited = false}) {
    const [isAdded, setIsAdded] = useState(false)
    const [isFavorite, setIsFavorite] = useState(favorited)

    const onClickPlus = () => {
        onPlus({title, price, imageUrl})
        setIsAdded(!isAdded)
    }

    const onClickFavorite = () => {
        onFavorite({id, title, price, imageUrl})
        setIsFavorite(!isFavorite)
    }

    return (
        <div className="card">
            <div className="favorite">
                <img onClick={onClickFavorite} src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Heart Unliked Icon"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers Icon"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена: </span>
                    <b>{price} руб.</b>
                </div>
                    <img onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus Icon"/>
            </div>
        </div>
    )
}

export default Card;