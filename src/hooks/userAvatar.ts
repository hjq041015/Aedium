import type { User } from "@neondatabase/neon-js/auth/types";
import { useState } from "react";

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

export function uploadUserAvatar() {}
