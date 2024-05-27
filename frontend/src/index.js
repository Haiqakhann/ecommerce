import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ShopcontextProvider } from "./Context/Shopcontext";
import { UsercontextProvider } from "./Context/Usercontext";
import { CartcontextProvider } from './Context/Cartcontext';
import { OrdercontextProvider } from './Context/Ordercontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ShopcontextProvider>
        <CartcontextProvider>
          <UsercontextProvider>
            <OrdercontextProvider>
              <App />

            </OrdercontextProvider>
        </UsercontextProvider>
      </CartcontextProvider>
    </ShopcontextProvider>
  // </React.StrictMode>
);


