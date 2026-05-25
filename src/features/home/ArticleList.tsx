import { useQuery } from '@tanstack/react-query';

import ArticleListItem from '@/features/home/ArticleListItem';
import { getArticles } from '@/services/apiArticle.ts';
import Loading from '@/ui/Loading';

function ArticleList() {
  const {
    data: articleDisplay,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['get-article'],
    queryFn: getArticles,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <main className="content-layout-h flex items-center justify-center">
        <div className="text-error">{error.message || 'Failed to load articles'}</div>
      </main>
    );
  }

  if (!articleDisplay || articleDisplay.length === 0) {
    return (
      <main className="content-layout-h flex items-center justify-center">
        <div>No article found</div>
      </main>
    );
  }

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {articleDisplay.map((articleDisplay) => (
        <ArticleListItem key={articleDisplay.id} articleDisplay={articleDisplay} />
      ))}
    </ul>
  );
}
export default ArticleList;
