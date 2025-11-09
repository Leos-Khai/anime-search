import { type AnimeData } from "../services/api";

export interface AnimeState {
  results: AnimeData[];
  selectedAnime: AnimeData | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  hasSearched: boolean;
}
