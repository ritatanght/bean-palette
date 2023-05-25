"use client";
import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import ProductCard from "./ProductCard";
import { ProductData } from "../../types/types";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const ProductList: React.FC<{ products: ProductData[] }> = ({ products }) => {
  const [maxPrice, setMaxPrice] = useState(0);
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState({
    name: "",
    origin: "",
    processMethod: "",
    min: 0,
    max: 0,
  });

  useEffect(() => {
    let price = 0;
    for (let i = 0, length = products.length; i < length; i++) {
      const sortedPrice = products[i].sizePrice.sort(
        (a, b) => b.price - a.price
      );
      price = sortedPrice[0].price > maxPrice ? sortedPrice[0].price : maxPrice;
    }
    setMaxPrice(price);
    setFilter((prevFilter) => ({ ...prevFilter, min: 0, max: price }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  let originList: string[] = [];
  let processMethodList: string[] = [];
  products.map(({ origin, processMethod }) => {
    if (!originList.includes(origin)) {
      originList.push(origin);
    }
    if (!processMethodList.includes(processMethod)) {
      processMethodList.push(processMethod);
    }
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let parsedVal: number;
    if (name === "min" || name === "max") {
      parsedVal = Number(value);
    }
    setFilter((prevFilter) => ({ ...prevFilter, [name]: parsedVal || value }));
  };

  const handleFilterReset = () => {
    setFilter({
      name: "",
      origin: "",
      processMethod: "",
      min: 0,
      max: maxPrice,
    });
  };

  // filter and sort product list for display
  const displayProducts =
    filter.name ||
    filter.origin ||
    filter.processMethod ||
    filter.min !== 0 ||
    filter.max !== maxPrice
      ? products
          .filter((item) => {
            const productPrices = item.sizePrice.map((pair) => pair.price);
            if (
              productPrices.some(
                (price) => price >= filter.min && price <= filter.max
              )
            ) {
              if (filter.origin && filter.processMethod) {
                return (
                  item.origin === filter.origin &&
                  item.processMethod === filter.processMethod
                );
              } else if (filter.origin || filter.processMethod) {
                if (filter.origin) return item.origin === filter.origin;
                return item.processMethod === filter.processMethod;
              }

              return item;
            }
          })
          .filter((item) =>
            item.name.toUpperCase().includes(filter.name.toUpperCase())
          )
      : products;

  switch (sort) {
    case "alpha-asc":
      displayProducts.sort((a, b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
        return 1;
      });
      break;
    case "alpha-desc":
      displayProducts.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
        return 1;
      });
      break;
    case "price-asc":
      displayProducts.sort(
        (a, b) => a.sizePrice[0].price - b.sizePrice[0].price
      );
      break;
    case "price-desc":
      displayProducts.sort(
        (a, b) => b.sizePrice[0].price - a.sizePrice[0].price
      );
      break;
    default:
      null;
  }

  return (
    <div className="container products-filter-wrapper">
      <button
        className="btn filter-expand-toggle"
        onClick={() => setIsFilterBarOpen(!isFilterBarOpen)}
        aria-controls="filters"
        aria-expanded={isFilterBarOpen}
      >
        Filters{" "}
        <span className="icon-btn" aria-label="Toggle expand filters">
          {isFilterBarOpen ? <MdExpandLess /> : <MdExpandMore />}
        </span>
      </button>

      <section
        id="filters"
        className={`filter__container ${isFilterBarOpen ? "show-filters" : ""}`}
      >
        <FilterBar
          filter={filter}
          originList={originList}
          processMethodList={processMethodList}
          maxPrice={maxPrice}
          handleFilterChange={handleFilterChange}
          handleFilterReset={handleFilterReset}
        />
      </section>
      <section className="products-list-wrapper">
        <select
          className="sort-bar"
          name="sort"
          defaultValue=""
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="" disabled>
            Sort By
          </option>
          <option value="alpha-asc">Alphabetical (A-Z)</option>
          <option value="alpha-desc">Alphabetical (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
        <div className="products-container">
          {displayProducts.length === 0 ? (
            <p className="no-products-msg text-center">
              Oops! It seems that there are no products that match your current
              filtering criteria.
            </p>
          ) : (
            displayProducts?.map((product: ProductData) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductList;
