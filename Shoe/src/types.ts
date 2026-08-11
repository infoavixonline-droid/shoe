export interface Shoe {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
  mostPicked: boolean;
  bestSelling: boolean;
  dateAdded: string;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}
