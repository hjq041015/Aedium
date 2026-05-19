import { createFileRoute } from "@tanstack/react-router";
import ArticleList from "@/components/ArticleList.tsx";

export const Route = createFileRoute("/_app/")({
  component: ArticleListComponent,
});

function ArticleListComponent() {
  return <ArticleList />;
}
