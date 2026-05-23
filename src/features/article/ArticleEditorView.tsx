import { type BlockNoteEditor } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';

import styles from './ArticleEditor.module.css';
import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';

function ArticleEditorView({
  editor,
  editable = true,
  onChange,
  className,
}: {
  editor: BlockNoteEditor;
  editable?: boolean;
  onChange?: (editor: BlockNoteEditor) => void;
  className?: string;
}) {
  return (
    <>
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={onChange}
        className={`${styles.editor} ${className}`}
      />
    </>
  );
}
export default ArticleEditorView;
