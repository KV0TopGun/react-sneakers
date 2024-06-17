import React from 'react';
import  {Link} from 'react-router-dom';
import {useCart} from '../hooks/useCart';
import {useScrollLock} from "../hooks/useScrollLock";

function Header(props) {
    const {totalPrice} = useCart();
    const { lockScroll, unlockScroll } = useScrollLock();

    return(
        <header className="d-flex justify-between	align-center p-40" >
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="img/logo.svg" alt="logo"/>
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Best sneakers shop</p>
                    </div>
            </div>
        </Link>
            <ul className="d-flex">
                <li onClick={() => {props.onClickCart(); lockScroll(); }} className="mr-30 cu-p ">
                    <img width={18} height={18}  src="img/main-cart.svg" alt="cart"/>
                    <span>{totalPrice}$</span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to="/favorites">
                        <img  width={18} height={18} src="img/favorite.svg" alt="favorite"/>
                    </Link>

                </li>
                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="img/main-profile.svg" alt="profile"/>
                    </Link>

                </li>
            </ul>
        </header>

    );
}

export default Header;