import { createFileRoute } from "@tanstack/react-router";
import ArticleEditor from "../components/ArticleEditor.tsx";

export const Route = createFileRoute("/editor")({
  component: ArticleEditor,
});
