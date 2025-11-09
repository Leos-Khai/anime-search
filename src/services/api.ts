import axios, { type CancelTokenSource } from "axios";

const BASE_URL = "https://api.jikan.moe/v4";

let cancelTokenSource: CancelTokenSource | null = null;

export interface AnimeData {
  mal_id: number;
  title: string;
  title_english: string | null;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  score: number | null;
  episodes: number | null;
  synopsis: string | null;
  year: number | null;
  status: string;
  genres: Array<{ mal_id: number; name: string }>;
  studios: Array<{ mal_id: number; name: string }>;
  rating: string | null;
  duration: string | null;
  type: string | null;
}

export interface SearchResponse {
  data: AnimeData[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface AnimeDetailResponse {
  data: AnimeData;
}

export const searchAnime = async (
  query: string,
  page: number = 1
): Promise<SearchResponse> => {
  // Cancel previous request if it exists
  if (cancelTokenSource) {
    cancelTokenSource.cancel("New search initiated");
  }

  // Create new cancel token
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.get<SearchResponse>(`${BASE_URL}/anime`, {
      params: {
        q: query,
        page,
        limit: 24,
      },
      cancelToken: cancelTokenSource.token,
    });

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error("Request cancelled");
    }
    throw error;
  }
};

export const getAnimeById = async (id: number): Promise<AnimeData> => {
  try {
    const response = await axios.get<AnimeDetailResponse>(
      `${BASE_URL}/anime/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
