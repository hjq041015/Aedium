import type { Block } from "@blocknote/core";

type BlockContent = Block["content"];

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
    return isContentEmpty(block.content) && isEditorEmpty(block.children);
  });
}
