import type { PartialBlock } from '@blocknote/core';

import { debounce } from 'es-toolkit';
import { useSetAtom } from 'jotai';
import { useLocalStorage } from 'react-use';

import { isEditorEmptyAtom } from '@/atoms/editor.ts';
import { EDITOR_DEFAULT } from '@/constants/editor.ts';
import { isEditorEmpty } from '@/utils/editorHelper.ts';

const DRAFT_KEY = 'draft';

export function useDraft() {
  const [draft, setDraft] = useLocalStorage<PartialBlock[]>(DRAFT_KEY, EDITOR_DEFAULT);

  const setIsEditorEmpty = useSetAtom(isEditorEmptyAtom);

  const saveDraft = debounce((document) => {
    if (isEditorEmpty(document)) {
      setDraft(EDITOR_DEFAULT);
      setIsEditorEmpty(true);
      return;
    }
    setDraft(document);
    setIsEditorEmpty(false);
  }, 500);

  return { draft, setDraft, saveDraft };
}
