import { useEffect } from "react";
import ArticleListItem from "./ArticleListItem.tsx";
import { getArticles } from "../services/apiArticle.ts";

function ArticleList() {
  useEffect(() => {
    getArticles();
  }, []);

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
    </ul>
  );
}
export default ArticleList;
