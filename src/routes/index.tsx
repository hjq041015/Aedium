import { createFileRoute } from "@tanstack/react-router";
import ArticleList from "../components/ArticleList.tsx";
import RootLayout from "../components/RootLayout.tsx";

export const Route = createFileRoute("/")({
  component: ArticleListComponent,
});

function ArticleListComponent() {
  return (
    <RootLayout>
      <ArticleList />
    </RootLayout>
  );
}
