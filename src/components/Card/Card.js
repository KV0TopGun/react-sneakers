import React from 'react'
import styles from './Card.module.scss'
import {AppContext} from '../../App';


function Card ({
                   id,
                   imageUrl,
                   price,
                   onClickFavorite,
                   title,
                   onClickPlus,
                   favorited=false,

}) {

const [isFavorite, setIsFavorite] = React.useState(favorited);
const {isItemAdded} = React.useContext(AppContext);
const carObj = {id, parentId: id, price, imageUrl, title};

const onClickPlusPlus = () =>  {
    onClickPlus(carObj);
};

const onClickFavFav = () => {
    onClickFavorite(carObj);
    setIsFavorite(!isFavorite);
};

return (
    <div className={styles.card}>
        <>      {onClickFavorite && <div className={styles.favorite}
                                         onClick={onClickFavFav}>
            <img
                src={isFavorite ? "img/heart1.svg" : "img/heart0.svg"}
                alt="heart"/>
        </div> }

            <img width="100%" height={125} src={imageUrl} alt="shoes"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column ">
                    <span>Price:</span>
                    <b>{price} $</b>
                </div>
                <div>
                    {onClickPlus && <img
                            className={styles.clickPlus}
                            onClick={onClickPlusPlus}
                            src={isItemAdded(id) ? "img/checkmark.svg" : "img/plus.svg"}
                            alt="clickPlus"/>
                    }
                </div>
            </div>
        </>
    </div>
    );
}

export default Card;