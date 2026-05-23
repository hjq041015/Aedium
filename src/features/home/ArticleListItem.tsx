import { HeartIcon } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

import type { Article } from '@/types/Article.ts';

function ArticleListItem({ article }: { article: Article }) {
  function getArticleBrief(content: string, maxLength = 100) {
    const blocks = JSON.parse(content);
    let brief = '';

    brief = blocks
      .map((block: any) => {
        let ownBrief = '';
        let childBrief = '';

        if (Array.isArray(block.content)) {
          ownBrief = block.content
            .map((item: any) => {
              if (item.type === 'text') {
                return item.text;
              }
              if (item.type === 'link') {
                if (Array.isArray(item.content)) {
                  return item.content.map((child: any) => child.text ?? '').join(' ');
                }
              }
              return '';
            })
            .join(' ');
        }

        if (Array.isArray(block.children)) {
          childBrief = block.children
            .map((child: any) => {
              return getArticleBrief(JSON.stringify([child]), maxLength);
            })
            .join(' ');
        }

        return `${ownBrief} ${childBrief}`.trim();
      })
      .join(' ')
      .trim()
      .replace(/\s+/g, ' ');

    return brief.length > maxLength ? brief.slice(0, maxLength) + '...' : brief;
  }

  return (
    <Link to="/article/$articleId" params={{ articleId: `${article.id}` }}>
      <li className="list-row">
        <div>
          <img
            className="size-30 rounded-box"
            src="https://img.daisyui.com/images/profile/demo/1@94.webp"
          />
        </div>
        <div>
          {/* Title */}
          <div className="text-2xl sm:text-5xl font-bold font-serif">{article.title}</div>

          {/* Content brief */}
          <div className="sm:text-2xl text-sm font-semibold opacity-60">
            {getArticleBrief(article.content)}
          </div>
        </div>
        <button className="btn btn-secondary btn-square btn-ghost">
          <div className="lg:tooltip tooltip-secondary" data-tip="like">
            <HeartIcon size={32} />
          </div>
        </button>
      </li>
    </Link>
  );
}
export default ArticleListItem;
