import React, {useEffect, useState} from 'react'
import axios from "axios";

import {Card, Header, Drawer} from "./components";

function App() {

    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)

    useEffect(() => {
        axios.get('https://6100179cbca46600171cf716.mockapi.io/items').then(res => {
            setItems(res.data)
        })
        axios.get('https://6100179cbca46600171cf716.mockapi.io/cart').then(res => {
            setCartItems(res.data)
        })
    }, [])

    const onAddToCart = (obj) => {
        axios.post('https://6100179cbca46600171cf716.mockapi.io/cart', obj)
        setCartItems((prev) => [...prev, obj])
    }

    const onRemoveItem = (id) => {
        axios.delete(`https://6100179cbca46600171cf716.mockapi.io/cart/${id}`)
        setCartItems((prev) => prev.filter(item => item.id !== id))
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
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
                    {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
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


