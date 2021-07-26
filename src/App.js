import React from 'react'

import {Card, Header, Drawer} from "./components";

function App() {
    return (
        <div className="wrapper clear">
            <Drawer/>
            <Header/>
            <div className="content p-40">
                <div className=" mb-40 d-flex justify-between align-center">
                    <h1>Все кроссовки</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search Icon"/>
                        <input placeholder="Поиск..." type="text"/>
                    </div>
                </div>
                <div className="d-flex">
                    <Card/>
                </div>
            </div>
        </div>
    );
}

export default App;
