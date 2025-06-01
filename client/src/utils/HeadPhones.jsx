import React from "react";
import ProductCard from "../components/ProductCard.jsx";
// import ProductCard from "../components/ProductCard";

const products = [
  { id: 300, name: "iPhone 15 Pro", price: 134999, image: "/images/iphone.jpg" },
  {
    id: 301,
    name: "Samsung S23 Ultra",
    price: 124999,
    image: "/images/samsung.jpg",
  },
];

const HeadPhones = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">HeadPhones</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HeadPhones;
