import type { User } from "@neondatabase/neon-js/auth/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/utils/supabaseHelper.ts";
import { toast } from "sonner";

export function useChangeUserAvatar(user: User) {
  const [imageUrl, setImageUrl] = useState(user?.image || "");
  const [currentAvatarFile, setCurrentAvatarFile] = useState<File | null>(null);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    const fileUrl = URL.createObjectURL(file!);
    setImageUrl(fileUrl);
    setCurrentAvatarFile(file);
  }

  return {
    imageUrl,
    handleImageChange,
    currentAvatarFile,
    setCurrentAvatarFile,
    setImageUrl,
  };
}

export function useUploadUserAvatar(
  currentAvatarFile: File | null,
  userId: string,
) {
  const { mutateAsync: uploadAvatar, isPending: isUploading } = useMutation({
    mutationFn: async () => {
      if (!currentAvatarFile) {
        throw new Error("No file selected");
      }

      const { data, error } = await supabase.storage
        .from("Aedium")
        .upload(`${Date.now()}-${userId}`, currentAvatarFile);

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Avatar updated successfully", {
        position: "top-center",
        richColors: true,
      });
    },
    onError: () => {
      toast.error("Error while updating avatar", {
        position: "top-center",
        richColors: true,
      });
    },
  });

  return { uploadAvatar, isUploading };
}
