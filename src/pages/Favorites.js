import React from "react";
import Card from "../components/Card/Card";
import {AppContext} from '../App';

function Favorites() {
    const {favorites, onAddToFavorite} = React.useContext(AppContext);

    return(
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1> Favorites </h1>
            </div>

            <div className="d-flex flex-wrap">
                {favorites.map((item) => (
                        <Card
                            key={item.imageUrl}
                           /* title={item.title}
                            price={item.price}
                            id={item.id}
                            imageUrl={item.imageUrl} */
                            {...item}
                            favorited={true}
                            onClickFavorite={onAddToFavorite}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Favorites;