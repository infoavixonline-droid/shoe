import React, { useState, useEffect } from 'react';
import { Shoe } from '../types';
import { ShoeCard } from '../components/ShoeCard';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import shoesData from '../data/shoes.json';

interface StoreProps {
  onSelectShoe: (shoe: Shoe) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const Store: React.FC<StoreProps> = ({ onSelectShoe, selectedCategory, setSelectedCategory }) => {
  const shoes = shoesData as Shoe[];
  
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Categories present in catalog
  const categories = ['All', 'Running', 'Basketball', 'Lifestyle', 'Training', 'Football'];

  // All unique sizes across catalog for size filter
  const allSizes = ['All', '6', '7', '8', '9', '10', '11', '12'];

  // Reset filters if category gets updated elsewhere
  useEffect(() => {
    // Optionally perform reset actions here
  }, [selectedCategory]);

  // Filtering Logic
  const filteredShoes = shoes.filter((shoe) => {
    const matchesCategory = selectedCategory === 'All' || shoe.category === selectedCategory;
    const matchesSize = selectedSize === 'All' || shoe.sizes.includes(selectedSize);
    return matchesCategory && matchesSize;
  });

  // Sorting Logic
  const sortedShoes = [...filteredShoes].sort((a, b) => {
    if (sortBy === 'price-low-high') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high-low') {
      return b.price - a.price;
    }
    if (sortBy === 'newest') {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
    // Default: 'featured' sorting
    return b.mostPicked ? 1 : a.mostPicked ? -1 : 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* 1. Page Header */}
      <div className="border-b-3 border-black pb-6">
        <span className="font-mono text-xs font-bold tracking-widest text-[#E4002B] uppercase">
          PERFORMANCE HUB
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-black tracking-tight mt-1">
          THE STORE
        </h1>
        <p className="text-gray-500 text-sm mt-2 max-w-xl">
          Equip yourself with elite athletic footwear engineered to shatter boundaries and redefine speeds.
        </p>
      </div>

      {/* 2. Filters & Categories Section */}
      <div className="space-y-6">
        {/* Category Pill Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest transition-all duration-150 border border-black ${
                  isActive
                    ? 'bg-[#E4002B] border-[#E4002B] text-white'
                    : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Dropdowns Filters Bar */}
        <div className="bg-white border border-black/10 p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Filter by Size */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-500 shrink-0" />
              <label className="font-display text-xs font-bold tracking-wider text-black uppercase shrink-0">
                SIZE:
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="bg-white border border-black/20 font-mono text-xs font-bold p-2 text-black focus:outline-none focus:border-black shrink-0"
              >
                {allSizes.map((size) => (
                  <option key={size} value={size}>
                    {size === 'All' ? 'ALL SIZES' : `US ${size}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500 shrink-0" />
            <label className="font-display text-xs font-bold tracking-wider text-black uppercase shrink-0">
              SORT BY:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-black/20 font-display text-xs font-bold p-2 text-black focus:outline-none focus:border-black"
            >
              <option value="featured">FEATURED</option>
              <option value="price-low-high">PRICE: LOW TO HIGH</option>
              <option value="price-high-low">PRICE: HIGH TO LOW</option>
              <option value="newest">LATEST DROPS</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Product Grid */}
      {sortedShoes.length > 0 ? (
        <div>
          <div className="text-right text-[11px] font-mono font-bold text-gray-400 mb-4 uppercase tracking-widest">
            SHOWING {sortedShoes.length} GEARS AVAILABLE
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedShoes.map((shoe) => (
              <ShoeCard key={shoe.id} shoe={shoe} onSelect={onSelectShoe} />
            ))}
          </div>
        </div>
      ) : (
        <div className="border-3 border-dashed border-black/10 py-24 text-center space-y-4">
          <span className="text-3xl">👟</span>
          <h3 className="font-display text-lg font-bold uppercase text-black">
            NO SNEAKERS FOUND
          </h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Try resetting your size filter or browse a different category to find your perfect fit.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedSize('All');
              setSortBy('featured');
            }}
            className="border-2 border-black px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors"
          >
            RESET FILTERS
          </button>
        </div>
      )}
    </div>
  );
};
