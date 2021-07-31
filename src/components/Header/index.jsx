import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

function Header(props) {
    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="/img/logo.png" alt="Logo Icon"/>
                    <div>
                        <h3 className='text-uppercase'>React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex cu-p">
                <li onClick={props.onClickCart} className="mr-30">
                    <img width={18} height={18} src="/img/cart.svg" alt="Cart Icon"/>
                    <span>1205 руб.</span>
                </li>
                <li className="mr-20">
                    <Link to="/favorites">
                        <img width={18} height={18} src="/img/heart.svg" alt="Hearth Icon"/>
                    </Link>
                </li>
                <li>
                    <img width={18} height={18} src="/img/user.svg" alt="User Icon"/>
                </li>
            </ul>
        </header>
    )
};

export default Header;