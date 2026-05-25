import { useQuery } from '@tanstack/react-query';

import ArticleListItem from '@/features/home/ArticleListItem';
import { getArticles } from '@/services/apiArticle.ts';
import Loading from '@/ui/Loading';

function ArticleList() {
  const { data: articleDisplay, isLoading } = useQuery({
    queryKey: ['get-article'],
    queryFn: getArticles,
  });

  if (isLoading || !articleDisplay) {
    return <Loading />;
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
