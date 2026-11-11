import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { StoreProvider } from './store';
import Home from './pages/Home';
import Photography from './pages/Photography';
import Portraits from './pages/Portraits';
import Framing from './pages/Framing';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Print from './pages/Print';
import Catalogue from './pages/Catalogue';
import Configure from './pages/Configure';
import Account from './pages/Account';
import Cart from './pages/Cart';
import { Artwork, Gallery } from './pages/Gallery';
import Quote from './pages/Quote';
import { About, Contact } from './pages/Info';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="photography" element={<Photography />} />
            <Route path="photography/portraits" element={<Portraits />} />
            <Route path="photography/framing" element={<Framing />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:slug" element={<Product />} />
            <Route path="print" element={<Print />} />
            <Route path="gifts" element={<Catalogue />} />
            <Route path="gifts/:slug" element={<Configure />} />
            <Route path="account" element={<Account />} />
            <Route path="cart" element={<Cart />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="gallery/:slug" element={<Artwork />} />
            <Route path="quote" element={<Quote />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
