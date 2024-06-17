import React from 'react';
import axios from 'axios';


import Info from "../Info";
import {useCart} from "../../hooks/useCart";
import {useScrollLock} from "../../hooks/useScrollLock";

import styles from "./Drawer.module.scss"

const delay = (ms) => new Promise((resolve) => setTimeout(resolve,ms));

function Drawer({onClose, onRemove, items = [], opened }) {

    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const {cartItems, setCartItems,totalPrice} = useCart();
    const { lockScroll, unlockScroll } = useScrollLock();

    const onClickOrder = async () => {

        try{
            setIsLoading(true);
            const {data} = await axios.post('https://65c679e8e5b94dfca2e19510.mockapi.io/orders', {
                items: cartItems});
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i=0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://65b93a74b71048505a8a79e6.mockapi.io/cart/` + item.id);
                await delay(1000);
            }

        } catch (error) {
            alert('Can`t create order');
        }
        setIsLoading(false);
    };

    return(
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
        <div className={styles.drawer}>
            <h2 className="mb-30 d-flex justify-between">Cart
                <img onClick={() => {
                         onClose();
                         unlockScroll();
                     }}
                     className="cu-p"
                     src="img/btn-close.svg"
                     alt="btn-close"/>
            </h2>

            {
                items.length > 0 ? (
                    <div>
                    <div className= {styles.drCartItems}>
                        <div className="items flex">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20 ">
                                    <div style={{backgroundImage: `url(${obj.imageUrl})`}}
                                         className="cartItemImg"> </div>

                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} $</b>
                                    </div>

                                    <img
                                        onClick={() => onRemove(obj.id)}
                                        className="removeBtn"
                                        src="img/btn-close.svg"
                                        alt="btn-close" />
                                </div>
                            ))}
                        </div>



                    </div>
                    <div className="cartTotalBlock d-flex flex-column pt-15" >
                        <ul>
                            <li>
                                <span>Total:</span>
                                <div></div>
                                <b>{totalPrice}$</b>
                            </li>
                            <li>
                                <span>Tax:</span>
                                <div></div>
                                <b>{totalPrice*0.05}$</b>
                            </li>
                        </ul>
                        <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Order
                            <img src="img/arrow.svg"
                                 alt="arrow"/>
                        </button>
                    </div>
                    </div>
                ) : (
                    <Info
                        title={isOrderComplete ? 'Order complete' : 'Empty cart'}
                        description={isOrderComplete ? `Your order #${orderId} has been submitted to administrator` : 'Add at least one item to make order'}
                        image={isOrderComplete ? 'img/compl-order.svg' : 'img/empty-cart.svg'}
                    />
                )
            }

        </div>
    </div>
    );
}

export default Drawer;