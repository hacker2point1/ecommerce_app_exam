"use client";

import { ProductSkeleton } from "@/components/cardSkelitonLoader/productSkeleton";
import { addToCart } from "@/redux/slice/cartSlice";
import { fetchProducts } from "@/redux/slice/productSlice";
import { Grid} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./homePage.module.css"

export default function HomeCart() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
  const filteredProducts = useMemo(() => {
    let filtered = [...items];

    if (priceFilter) {
      filtered = filtered.filter(
        (item) => item.price <= Number(priceFilter)
      );
    }

    if (ratingFilter) {
      filtered = filtered.filter(
        (item) => item.rating.rate >= Number(ratingFilter)
      );
    }

    if (sortOption === "price") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [items, priceFilter, ratingFilter, sortOption]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="heading">Products</h1>

     
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="number"
          placeholder="Max Price"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Rating"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price">Sort by Price</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      
      {/* {status === "loading" && <p>Loading...</p>} */}




{status === "loading" && (
  <Grid container spacing={3} sx={{ mt: 2 }}>
    {Array.from(new Array(8)).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <ProductSkeleton />
      </Grid>
    ))}
  </Grid>
)}



      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
          {filteredProducts.map((item) => (
  <div key={item.id} className={styles.cardContainer}>



            <img
              src={item.image}
              alt={item.title}
              style={{ height: "120px", objectFit: "contain" }}
            />

            <h4 className={styles.cardHead}>{item.title}</h4>
            <p className={styles.price}>$ {item.price}</p>
            <p className={styles.starRating}>⭐ {item.rating.rate}</p>

            
            <button
  onClick={() =>
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      })
    )
  }
  className={styles.addButton}
>
  Add to Cart
</button>

          </div>
        ))}
      </div>
    </div>
  );
}
