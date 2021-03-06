import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const APP_ID = "5ae5db4c";
const APP_KEY = "b13d73947a5ec19f0c8e7c92f54e7bc0";

const SearchBar = ({
  recipeDetails,
  showSearchBar,
  fetchDetails,
  loadDetails,
  keywordDetails
}) => {
  const [veg, setVeg] = useState("water");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = recipeDetails;
  const [fetchNumber, setFetchNumber] = fetchDetails;
  const [loadMore, setLoadMore] = loadDetails;
  const [keyword, setKeyword] = keywordDetails;

  const inputRef = useRef();

  const handleChange = e => {
    const {
      target: { name, value }
    } = e;
    setVeg(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setRecipe("");
    fetchRecipe(veg);
    setKeyword(veg);
  };

  const fetchRecipe = async veg => {
    const result = await axios.get(
      `https://api.edamam.com/search?q=${veg}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${
        fetchNumber.from
      }&to=${fetchNumber.to}&calories=591-722&health=alcohol-free`
    );
    if(result.data.more === false){
      setLoadMore(false)
    }
    if (keyword === veg) {
      setRecipe([...recipe, ...result.data.hits]);
      setLoading(false);
    } else {
      setRecipe(result.data.hits);
      setLoading(false);
    }
  };

  useEffect(() => {
    showSearchBar && inputRef.current.focus();
  }, [showSearchBar]);

  useEffect(() => {
    fetchRecipe(veg);
  }, [loadMore]);

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group col-md-10 col-sm-10 col-xs-10">
          <input
            type="text"
            placeholder="Name your vegetable here..."
            className="form-control"
            ref={inputRef}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-2 col-sm-2 col-xs-2">
          <input
            type="submit"
            className="form-control"
            value={loading ? "Loading" : "Search"}
            disabled={loading}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
