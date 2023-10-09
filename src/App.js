
import Header from './Component/Layout/Header';
import Meals from './Component/Meals/Meals';
import Cart from './Component/Cart/Cart';
import { useState } from 'react';
import CartProvider from './store/CartProvider';

function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
    document.body.classList.add('lock-scroll');
  }
  const hideCartHandler = () => {
    setCartIsShown(false);
    document.body.classList.remove('lock-scroll');
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <main>
        <Header onShowCart={showCartHandler} />
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
