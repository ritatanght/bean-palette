import { CSSProperties } from "react";
import { BiSearch } from "react-icons/bi";
interface FilterBarProps {
  filter: {
    name: string;
    origin: string;
    processMethod: string;
    min: number;
    max: number;
  };
  originList: string[];
  processMethodList: string[];
  maxPrice: number;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterReset: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  originList,
  processMethodList,
  maxPrice,
  handleFilterChange,
  handleFilterReset,
}) => {
  const passedInlineStyle = {
    "--min-range-width": `${Math.min(
      Math.round((filter.min * 100) / maxPrice),
      100
    )}%`,
    "--max-range-width": `${Math.round(
      ((maxPrice - filter.max) * 100) / maxPrice
    )}%`,
  } as CSSProperties;

  return (
    <>
      <div className="search-bar">
        <input
          placeholder="Search"
          name="name"
          value={filter.name}
          onChange={handleFilterChange}
        />
        <BiSearch aria-hidden={true} />
      </div>
      <section>
        <h2>Price</h2>
        <div className="price-content text-center">
          <div>
            <label htmlFor="min-value">Min</label>
            <input
              type="number"
              id="min-value"
              name="min"
              className="text-center"
              value={filter.min.toString()}
              onChange={handleFilterChange}
            />
          </div>

          <div>
            <label htmlFor="max-value">Max</label>
            <input
              type="number"
              id="max-value"
              name="max"
              className="text-center"
              value={filter.max.toString()}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="range-slider">
          <input
            type="range"
            className="min-price"
            aria-label="Minimum Price Range Slider Thumb"
            name="min"
            value={filter.min}
            style={passedInlineStyle}
            min="0"
            max={maxPrice}
            step="0.5"
            onChange={handleFilterChange}
          />
          <input
            type="range"
            className="max-price"
            aria-label="Maximum Price Range Slider Thumb"
            value={filter.max}
            name="max"
            style={passedInlineStyle}
            min="0"
            max={maxPrice}
            step="0.5"
            onChange={handleFilterChange}
          />
        </div>
      </section>
      <section className="radio-filters-container">
        {originList.length > 0 && (
          <div>
            <h2>Origin</h2>
            {originList.map((origin) => (
              <label key={origin}>
                <input
                  className="filter__radio"
                  type="radio"
                  name="origin"
                  value={origin}
                  checked={filter.origin === origin}
                  onChange={handleFilterChange}
                />{" "}
                {origin}
              </label>
            ))}
          </div>
        )}

        {processMethodList.length > 0 && (
          <div>
            <h2>Process Method</h2>
            {processMethodList.map((method) => (
              <label key={method}>
                <input
                  className="filter__radio"
                  type="radio"
                  name="processMethod"
                  checked={filter.processMethod === method}
                  value={method}
                  onChange={handleFilterChange}
                />{" "}
                {method}
              </label>
            ))}
          </div>
        )}
      </section>
      <button className="btn filters-clear-btn" onClick={handleFilterReset}>
        Clear Filters
      </button>
    </>
  );
};

export default FilterBar;
