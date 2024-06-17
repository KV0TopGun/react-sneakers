import React from 'react';
import {Route, Routes} from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import Slider from "./components/Slider/Slider";



export const AppContext = React.createContext({});


function App() {
 const [items, setItems] = React.useState([]);
 const [favorites, setFavorites] = React.useState([]);
 const [cartOpened, setCartOpened] = React.useState(false);
 const [cartItems, setCartItems] = React.useState([]);
 const [searchItem, setSearchItem] = React.useState('');
 const [isLoading, setIsLoading] = React.useState(true);


 React.useEffect(() => {
     async function fetchData() {
         try {
             const cartResponse = await axios.get('https://65b93a74b71048505a8a79e6.mockapi.io/cart');
             const favoritesResponse = await axios.get('https://65c679e8e5b94dfca2e19510.mockapi.io/favorites');
             const itemsResponse = await axios.get('https://65b93a74b71048505a8a79e6.mockapi.io/items');
             setIsLoading(false);

             setItems(itemsResponse.data);
             setCartItems(cartResponse.data);
             setFavorites(favoritesResponse.data);
         } catch(error){
             alert('Database error');
         }
     }
        fetchData();
    }, []);

 const onAddToCard = async (obj) => {
     try {
         const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
         if (findItem) {
             setCartItems(prev => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
             await axios.delete(`https://65b93a74b71048505a8a79e6.mockapi.io/cart/${findItem.id}`);

         } else {
             setCartItems((prev) => [...prev, obj]);
             const { data } = await axios.post('https://65b93a74b71048505a8a79e6.mockapi.io/cart', obj);
             setCartItems((prev) => prev.map(item => {
                 if (item.parentId === data.parentId) {
                     return {
                         ...item, id: data.id
                     }
                 }
                 return item;
             }));

         }
     } catch (error) {
         alert('Can`t add to cart');
        }
 };

 const onAddToFavorite = async (obj) => {
     try {
         if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
             axios.delete(`https://65c679e8e5b94dfca2e19510.mockapi.io/favorites/${obj.id}`);
             setFavorites(prev => prev.filter((item) => Number(item.id) !== Number(obj.id)));
         } else {
             const {data} = await axios.post('https://65c679e8e5b94dfca2e19510.mockapi.io/favorites', obj);
             setFavorites((prev) => [...prev, data]);
         }
     } catch (error) {
         alert('Not added to favorites');
     }
 };

 const onRemoveItem = async (id) => {
     try {
         await axios.delete(`https://65b93a74b71048505a8a79e6.mockapi.io/cart/${id}`);
         setCartItems((prev) => prev.filter((item) => item.id !== id));
     } catch(error){
           alert('Can`t delete from cart');
     }
 };


const onChangeSearchInput = (event) =>{
    setSearchItem(event.target.value);
};

const isItemAdded = (id) => {
 return cartItems.some((obj) => Number(obj.parentId) === Number(id));
};



  return (
     <AppContext.Provider value={{
         items,
         favorites,
         cartItems,
         isItemAdded,
         onAddToFavorite,
         onAddToCard,
         setCartOpened,
         setCartItems }}>


         <div className="wrapper clear">
             <Drawer
                     items={cartItems}
                     opened={cartOpened}
                     onClose={() => setCartOpened(false)}
                     onRemove={onRemoveItem}/>

             <Header onClickCart={() => setCartOpened(true)}/>

             <Routes>
                 <Route path=" " element={
                     <Home
                         items={items}
                         cartItems={cartItems}
                         searchItem={searchItem}
                         setSearchItem={setSearchItem}
                         onChangeSearchInput={onChangeSearchInput}
                         onAddToCard={onAddToCard}
                         onAddToFavorite={onAddToFavorite}
                         isLoading={isLoading}

                     /> } exact />

                 <Route path="favorites" exact element={
                     <Favorites/>
                 }/>

                 <Route path="orders" exact element={
                     <Orders/>
                 }/>

             </Routes>
         </div>
     </AppContext.Provider>

    );
}

export default App;
