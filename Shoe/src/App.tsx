/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Store } from './pages/Store';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { ShoeDetailModal } from './components/ShoeDetailModal';
import { Shoe } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleSelectShoe = (shoe: Shoe) => {
    setSelectedShoe(shoe);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} onSelectShoe={handleSelectShoe} />;
      case 'store':
        return (
          <Store
            onSelectShoe={handleSelectShoe}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'cart':
        return <Cart setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} onSelectShoe={handleSelectShoe} />;
    }
  };

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#0D0D0D]">
        {/* Navigation */}
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {/* Dynamic Page Views */}
        <main className="flex-grow">
          {renderPage()}
        </main>

        {/* Footnotes / Inverted Footer */}
        <Footer setCurrentPage={setCurrentPage} setSelectedCategory={setSelectedCategory} />

        {/* Floating Detail Overlay */}
        <ShoeDetailModal shoe={selectedShoe} onClose={() => setSelectedShoe(null)} />
      </div>
    </CartProvider>
  );
}

