import React, { useContext, useState, useEffect } from "react";
import Layout from "../Core/Layout";
import SearchBar from "../Core/SearchBar";
import Card from "../Core/Card";
import Keyword from "../Core/Keyword";
import { MainContext } from "../../MainContext";

import { useSpring, animated } from "react-spring";

const Home = () => {
  const [recipe, setRecipe] = useState([]);

  const [showSearchBar] = useContext(MainContext);
  const contentProps = useSpring({
    opacity: showSearchBar ? 1 : 0,
    marginTop: showSearchBar ? 0 : -15
  });

  const [keyword, setKeyword] = useState("water");

  const [fetchNumber, setFetchNumber] = useState({
    from: 0,
    to: 9
  });

  const [loadMore, setLoadMore] = useState(1);

  const handleLoadMore = () => {
    setFetchNumber({ from: fetchNumber.from + 9, to: fetchNumber.to + 9 });
    setLoadMore(loadMore+1);
  };

  useEffect(()=>{
      window.addEventListener("scroll", handleScrollListener)
    return(()=>{
      window.removeEventListener("scroll", handleScrollListener)
    })
  }, [loadMore])

  const handleScrollListener = () => {
      console.log(window.scrollY > (1640*loadMore))

      if(window.scrollY > (1220*loadMore)){
          handleLoadMore();
      }
  }

  return (
    <Layout>
    {console.log(window.scrollY)}
      <animated.div style={contentProps}>
        <SearchBar
          recipeDetails={[recipe, setRecipe]}
          showSearchBar={showSearchBar}
          fetchDetails={[fetchNumber, setFetchNumber]}
          loadDetails={[loadMore, setLoadMore]}
          keywordDetails={[keyword, setKeyword]}
        />
      </animated.div>
      <div className="row">
        <div className="container">
          <Keyword keyword={keyword} />
        </div>
      </div>
      <div className="row">
        {recipe.length > 0 &&
          recipe.map((rec, i) => {
            return (
              <div key={i} className="col-md-4 col-sm-6">
                <Card recipe={rec.recipe} />
              </div>
            );
          })}
      </div>
      <div className="row">
        {recipe.length > 0 && loadMore && (
          <div className="col-md-4">
            <button className="btn btn-primary mb-2" onClick={handleLoadMore}>
              Load More...
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
