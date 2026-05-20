import type { User } from "@neondatabase/neon-js/auth/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteArticleById, getArticleById, InsertArticle, UpdateArticle as UpdateArticleApi } from "@/services/apiArticle.ts";
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

export function useUpdateArticle() {

    const { mutateAsync: handleUpdate } = useMutation({
        mutationFn: async ({ articleId, editor }: { articleId: string, editor: BlockNoteEditor }) => {
            const updateArticle = buildArticleInsert(editor, articleId);
            await UpdateArticleApi({
                title: updateArticle.title,
                content: updateArticle.content,
                update_at: new Date().toISOString()
            }, Number(articleId));
        },
        onError: () => {
            toast.error("Error while updating article", {
                position: "top-center",
                richColors: true,
            });

        },
        onSuccess: () => {
            toast.success("Article updated successfully", {
                position: "top-center",
                richColors: true,
            });
        }
    })

    return { handleUpdate };

}


export function useDeleteArticle() {
    const { mutate: handleDelete, isPending: isDeleteing } = useMutation({
        mutationFn: async ({ articleId }: { articleId: string }) => {
            await deleteArticleById(Number(articleId));
        },
        onError: () => {
            toast.error("Error while deleting article", {
                position: "top-center",
                richColors: true,
            });
        },
        onSuccess: () => {
            toast.success("Article deleted successfully", {
                position: "top-center",
                richColors: true,
            });
        }
    })

    return { handleDelete, isDeleteing };
}