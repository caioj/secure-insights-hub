import { useState, useEffect } from "react";
import { toast } from "sonner";

const FAVORITES_KEY = "securedev_favorites";

export interface Favorite {
  id: string;
  title: string;
  type: "article" | "checklist" | "snippet";
  url: string;
  savedAt: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading favorites:", e);
      }
    }
  }, []);

  const addFavorite = (item: Omit<Favorite, "savedAt">) => {
    const newFavorite: Favorite = {
      ...item,
      savedAt: new Date().toISOString(),
    };
    
    const updated = [...favorites, newFavorite];
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    toast.success("Adicionado aos favoritos");
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    toast.success("Removido dos favoritos");
  };

  const isFavorite = (id: string) => {
    return favorites.some((f) => f.id === id);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};
