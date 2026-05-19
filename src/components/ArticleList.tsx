import { useQuery } from "@tanstack/react-query";
import ArticleListItem from "./ArticleListItem.tsx";
import { getArticles } from "../services/apiArticle.ts";
import Loading from "./Loading.tsx";

function ArticleList() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["get-article"],
    queryFn: getArticles,
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {articles?.map((article) => (
        <ArticleListItem key={article.id} article={article} />
      ))}
    </ul>
  );
}
export default ArticleList;
