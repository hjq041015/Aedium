import { createFileRoute } from "@tanstack/react-router";
import ArticleDetails from "@/features/article/ArticleDetails";

export const Route = createFileRoute("/_app/article/$articleId")({
  component: ArticleDetails,
});
