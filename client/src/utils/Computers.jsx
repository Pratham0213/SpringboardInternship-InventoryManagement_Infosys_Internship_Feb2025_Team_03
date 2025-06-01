import React from "react";
import ProductCard from "../components/ProductCard";

const products = [
  { id: 100, name: "MacBook Air M2", price: 109999, image: "/images/macbook.jpg" },
  { id: 101, name: "Dell XPS 13", price: 99999, image: "/images/dell.jpg" }
];

const Computers = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Computers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Computers;
