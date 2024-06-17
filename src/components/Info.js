import React from 'react'
import {AppContext} from "../App";
import {useScrollLock} from "../hooks/useScrollLock";

const Info = ({ title, description, image }) => {
    const { setCartOpened } = React.useContext(AppContext);
    const { lockScroll, unlockScroll } = useScrollLock();

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20"
                 width="120px"

                 src={image}
                 alt="empty-cart"/>
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => {
                setCartOpened(false);
                unlockScroll();
            } } className="greenButton">
                <img src="img/arrow.svg" alt="arrow"/>
                Back to the main page
            </button>
        </div>
    )
}

export default Info;