import { HeartIcon } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

import type { ArticleDisplay } from '@/types/Article.ts';

import Avatar from '@/ui/Avatar.tsx';

function ArticleListItem({ articleDisplay }: { articleDisplay: ArticleDisplay }) {
  function getArticleBrief(content: string, maxLength = 50) {
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

  const articleUpdatedTime = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link to="/article/$articleId" params={{ articleId: `${articleDisplay.id}` }}>
      <div className="m-4 flex  items-center gap-4">
        <Avatar
          avatarUrl={articleDisplay.author.image ?? ''}
          username={articleDisplay.author.name}
          size="sm"
          className="w-10"
        />
        <div>
          <div className="text-2xl" sm:text-4xl>
            {articleDisplay.author.name}
          </div>
          <div className="opacity-50">
            {articleUpdatedTime.format(new Date(articleDisplay.update_at))}
          </div>
        </div>
      </div>
      <li className="list-row">
        <div>
          <img
            className="size-30 rounded-box"
            src="https://img.daisyui.com/images/profile/demo/1@94.webp"
          />
        </div>
        <div>
          {/* Title */}
          <div className="text-2xl sm:text-5xl font-bold font-serif">{articleDisplay.title}</div>

          {/* Content brief */}
          <div className="sm:text-2xl text-sm font-semibold opacity-60">
            {getArticleBrief(articleDisplay.content)}
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
