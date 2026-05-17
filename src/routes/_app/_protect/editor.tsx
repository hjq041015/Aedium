import { createFileRoute } from "@tanstack/react-router";
import ArticleEditor from "../../../components/ArticleEditor.tsx";

export const Route = createFileRoute("/_app/_protect/editor")({
  component: ArticleEditor,
});
