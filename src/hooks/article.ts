import type { User } from "@neondatabase/neon-js/auth/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getArticleById, InsertArticle } from "@/services/apiArticle.ts";
import { buildArticleInsert } from "@/utils/editorHelper.ts";
import type { BlockNoteEditor } from "@blocknote/core";
import { toast } from "sonner";

export function usePublishArticle(user: User | null, editor: BlockNoteEditor) {
    const { mutateAsync: handlePublish } = useMutation({
        mutationFn: async (_value: any) => {
            if (!user) {
                throw new Error("No user found");
            }
            const insertArticleData = buildArticleInsert(editor, user.id);
            await InsertArticle(insertArticleData);
        },
        onError: () => {
            toast.error("Error while publishing article", {
                position: "top-center",
                richColors: true,
            });
        },
    });

    return { handlePublish };
}

export function useCurrentArticle(articleId: string) {
    const { data: article, isLoading } = useQuery({
        queryKey: ["article", articleId],
        queryFn: async () => {
            const article = await getArticleById(Number(articleId));
            return article;
        },
    });

    return { article, isLoading };
}
