import { createFileRoute } from "@tanstack/react-router";
import ArticleDetails from "../../components/ArticleDetails.tsx";

export const Route = createFileRoute("/_app/article/$articleId")({
  component: ArticleDetails,
});
