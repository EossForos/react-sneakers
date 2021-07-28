import React, {useEffect, useState} from 'react'

import {Card, Header, Drawer} from "./components";

function App() {

    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)

    useEffect(() => {
        fetch('https://6100179cbca46600171cf716.mockapi.io/items').then(res => {
            return res.json()
        }).then(json => {
            setItems(json)
        })
    }, [])

    const onAddToCart = (obj) => {
        setCartItems(prev => [...prev, obj])
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}
            <Header onClickCart={() => setCartOpened(true)} />
            <div className="content p-40">
                <div className=" mb-40 d-flex justify-between align-center">
                    <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search Icon"/>
                        {searchValue && (
                            <img
                                onClick={() => setSearchValue('')}
                                className="removeBtn cu-p clear"
                                src="/img/btn-remove.svg"
                                alt="Remove Cart Icon"
                            />
                        ) }
                        <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." type="text"/>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {items.map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            onFavorite
                            onPlus={(obj) => onAddToCart(obj)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;


