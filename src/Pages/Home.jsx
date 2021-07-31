import React from 'react'
import {Card} from "../components";

function Home({ items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart  }) {
    return (
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
                        onFavorite={(obj) => onAddToFavorite(obj)}
                        onPlus={(obj) => onAddToCart(obj)}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;