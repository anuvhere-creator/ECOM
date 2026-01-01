import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';   
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kids_banner from './Components/Assets/banner_kids.png';
import ShopContextProvider from './Context/ShopContext';
import { useContext } from 'react';
import { ShopContext } from './Context/ShopContext';

function AppContent() {
  const { isAuthenticated } = useContext(ShopContext);

  return (
    <>
      <Navbar />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path='/' element={<Shop />} />
            <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid" />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<LoginSignup />} />
          </>
        ) : (
          <Route path='*' element={<LoginSignup />} />
        )}
      </Routes>
      {isAuthenticated && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ShopContextProvider>
          <AppContent />
        </ShopContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
