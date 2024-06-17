import React from "react";
import Card from "../components/Card/Card";
import axios from "axios";
import {AppContext} from "../App";
import LoadingCard from "../components/Card/LoadingCard";

function Orders() {
    const {onAddToFavorite, onAddToCard} = React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try{
                const { data } = await axios.get('https://65c679e8e5b94dfca2e19510.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
                /*console.log(data.map((obj) => obj.items).flat());*/
                /*console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []));*/
            } catch (error){
              alert('doesn`t show order list');
              console.error(error);
            }
        })();
    },[]);

    return(
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1> My orders </h1>
            </div>

            <div className="d-flex flex-wrap">
                {isLoading
                    ? <LoadingCard len='10' /> : (
                        orders.map((item) => (
                            <Card
                                key={item.id}
                                
                                loading={isLoading}

                                {...item}
                            />
                        )))}
            </div>
        </div>
    );
}

export default Orders;