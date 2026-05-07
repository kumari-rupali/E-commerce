import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import SellerDashboard from './pages/SellerDashboard';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import SizeGuide from './pages/SizeGuide';
import HowToOrder from './pages/HowToOrder';
import Careers from './pages/Careers';
import CustomerCare from './pages/CustomerCare';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnsExchanges from './pages/ReturnsExchanges';
import ContactUs from './pages/ContactUs';
import SearchResults from './pages/SearchResults';
import { useStore } from './store/useStore';
import { MOCK_PRODUCTS } from './constants';

import { FirebaseProvider } from './lib/FirebaseProvider';

export default function App() {
  const { products, setProducts } = useStore();

  useEffect(() => {
    if (products.length === 0) {
      setProducts(MOCK_PRODUCTS);
    }
  }, [products.length, setProducts]);

  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
            <Route path="seller-dashboard" element={<SellerDashboard />} />
            <Route path="shipping" element={<ShippingPolicy />} />
            <Route path="returns" element={<ReturnsExchanges />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="about" element={<About />} />
            <Route path="size-guide" element={<SizeGuide />} />
            <Route path="how-to-order" element={<HowToOrder />} />
            <Route path="careers" element={<Careers />} />
            <Route path="customer-care" element={<CustomerCare />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  );
}
