import React, {useEffect, useState} from 'react'
import { Route } from 'react-router-dom'
import axios from "axios";

import {Header, Drawer} from "./components";
import {Home, Favorites} from "./Pages"

function App() {

    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3001/items').then(({data}) => {
            setItems(data)
        })
        axios.get('http://localhost:3001/cart').then(({data}) => {
            setCartItems(data)
        })
        axios.get('http://localhost:3001/favorites').then(({data}) => {
            setFavorites(data)
        })
    }, [])

    const onAddToCart = (obj) => {
        axios.post('http://localhost:3001/cart', obj);
        setCartItems((prev) => [...prev, obj])
    }

    const onRemoveItem = (id) => {
        axios.delete(`http://localhost:3001/cart/${id}`)
        setCartItems((prev) => prev.filter(item => item.id !== id))
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`http://localhost:3001/favorites/${obj.id}`)
                setFavorites((prev) => prev.filter(item => item.id !== obj.id))
            } else {
                const { data } = await axios.post('http://localhost:3001/favorites', obj);
                setFavorites((prev) => [...prev, data])
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты !')
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
            <Header onClickCart={() => setCartOpened(true)} />

            <Route exact path="/">
                <Home
                    items={items}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    onAddToCart={onAddToCart}
                    onAddToFavorite={onAddToFavorite}
                />
            </Route>

            <Route exact path="/favorites">
                <Favorites
                    items={favorites}
                    onAddToFavorite={onAddToFavorite}
                />
            </Route>

        </div>
    );
}

export default App;


