import { createFileRoute } from "@tanstack/react-router";
import ArticleList from "@/features/article/ArticleList";

export const Route = createFileRoute("/_app/")({
  component: ArticleListComponent,
});

function ArticleListComponent() {
  return <ArticleList />;
}
