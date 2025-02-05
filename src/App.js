import { useState, useEffect, useTransition, use } from "react";
import ProductCard from "./Components/ProductCard";

const PAGE_SIZE = 10;
export default function App() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=500");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setProducts(result.products);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    startTransition(() => {
      fetchData();
    });
  }, []); // Runs once on component

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };
  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  return (
    <div className="App">
      <h1>Pagination</h1>
      <div className="pagination-container">
        <button
          disabled={currentPage === 0}
          className="page-number"
          onClick={() => goToPrevPage()}
        >
          left
        </button>
        {[
          ...Array(noOfPages)
            .keys()
            .map((n) => (
              <button
                className={"page-number " + (n === currentPage ? "active" : "")}
                key={n}
                onClick={() => handlePageChange(n)}
              >
                {n}
              </button>
            )),
        ]}
        <button
          disabled={currentPage === noOfPages - 1}
          className="page-number"
          onClick={() => goToNextPage()}
        >
          Right
        </button>
      </div>
      <div className="product-container">
        {isPending && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {products.length > 0 ? (
          products
            .slice(start, end)
            .map((item) => (
              <ProductCard
                key={item.id}
                image={item.thumbnail}
                title={item.title}
                category={item.category}
                price={item.price}
                discountPercentage={item.discountPercentage}
                rating={item.rating}
                stock={item.stock}
              />
            ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}
