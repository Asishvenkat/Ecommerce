
import './App.css'
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Product from './Pages/Product';
import ProductList from './Pages/ProductList';
import Register from './Pages/Register';
import Wishlist from './Pages/wishlist';
import Orders from './Pages/order';
import ScrollToTop from "./components/Scroll";
import Test from "./Pages/test"
import Parent from "./Pages/par"
import Child from './Pages/child';

import {
  BrowserRouter as Router,
   Routes,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector((state) => state.user.currentUser);
  return   (
       <Router>
         <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/wishlist" element={<Wishlist />} /> 
       <Route path="/orders" element={<Orders />} />
       <Route path="/test" element={<Test/>}/>
      <Route path="/props" element={<Parent/>}/>
       {/* <Route path="/props" element={<Child/>}/> */}
      </Routes>
    </Router>
  );
}


export default App
