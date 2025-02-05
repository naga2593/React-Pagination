
export default function ProductCard({
  image,
  title,
  category,
  price,
  discountPercentage,
  rating,
  stock,
}) {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <p className="product-category">{category}</p>
        <div className="product-pricing">
          <span className="product-price">${price.toFixed(2)}</span>
          <span className="product-discount">-{discountPercentage}%</span>
        </div>
        <div className="product-meta">
          <span className="product-rating">Rating: ⭐{rating}</span>
          <span
            className={`product-stock ${
              stock > 0 ? "in-stock" : "out-of-stock"
            }`}
          >
            {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  );
}
