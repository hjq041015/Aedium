import type { Block, BlockNoteEditor } from "@blocknote/core";
import type { InsertArticle } from "@/types/Article.ts";

type BlockContent = Block["content"];
const CONTENTLESS_BLOCK_TYPES = new Set([
  "audio",
  "divider",
  "image",
  "video",
  "file",
]);

export function isContentEmpty(content: BlockContent | undefined) {
  if (!content) {
    return true;
  }

  // the content is TableContent
  if (!Array.isArray(content)) {
    return false;
  }

  // the content is InlineContent[]
  return content.every((item) => {
    // styledText
    if (item.type === "text") {
      return item.text.trim().length === 0;
    }
    // Link | CustomInlineContent
    if ("content" in item && Array.isArray(item.content)) {
      return item.content.every((child) => {
        return child.text.trim().length === 0;
      });
    }

    return false;
  });
}

export function isEditorEmpty(blocks: Block[]): boolean {
  return blocks.every((block) => {
    if (CONTENTLESS_BLOCK_TYPES.has(block.type)) {
      return false;
    }
    return isContentEmpty(block.content) && isEditorEmpty(block.children);
  });
}

export function buildArticleInsert(editor: BlockNoteEditor, userId: string): InsertArticle {
  const [headingBlock, ...contentBlock] = editor.document;
  const headingMarkdown = editor.blocksToMarkdownLossy([headingBlock]);
  const title = headingMarkdown.replace("# ", "").trim();

  return {
    title,
    content: JSON.stringify(contentBlock),
    author_id: userId,
  }
}
