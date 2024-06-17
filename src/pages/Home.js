import React from "react";


import Card from '../components/Card/Card';
import LoadingCard from '../components/Card/LoadingCard';
import Slider from '../components/Slider/Slider';

function Home
({
        items,
        searchItem,
        setSearchItem,
        onChangeSearchInput,
        onAddToCard,
        onAddToFavorite,
        isLoading
    }) {


    const renderItems = () => {

        return (isLoading
               ? <LoadingCard len='10' /> : (
                items.filter((item) =>
                item.title.toLowerCase().includes(searchItem.toLowerCase()))
               .map((item) => (
                <Card
                    key={item.id}
                    /*title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}*/


                    onClickPlus={(obj) => onAddToCard(obj)}
                    onClickFavorite={(obj) => onAddToFavorite(obj)}
                    loading={isLoading}


                    {...item}
                />
            )))

        );
    };



    return (


        <div className="content p-10">
            <Slider />
            <div className="d-flex align-center p-30 mb-40 justify-between">
                <h1>{searchItem ? `Search by request: "${searchItem}"` : 'All sneakers'}</h1>
                <div className="search-block d-flex">
                    <img src="img/search.svg" alt="search"/>

                    {searchItem && <img
                        onClick={() => setSearchItem('')}
                        className="clear cu-p"
                        src="img/btn-close.svg" alt="clear"/>}

                    <input onChange={onChangeSearchInput}
                           value={searchItem}
                           placeholder="Search" />
                </div>
            </div>

            <div className="d-flex flex-wrap ml-50">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;