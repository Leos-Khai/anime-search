import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getAnimeById, searchAnime } from "../services/api";
import { type AnimeState } from "./types";

const initialState: AnimeState = {
  results: [],
  selectedAnime: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchQuery: "",
  hasSearched: false,
};

export const fetchAnime = createAsyncThunk(
  "anime/fetchAnime",
  async ({ query, page }: { query: string; page: number }) => {
    const response = await searchAnime(query, page);
    return response;
  }
);

export const fetchAnimeById = createAsyncThunk(
  "anime/fetchAnimeById",
  async (id: number) => {
    const response = await getAnimeById(id);
    return response;
  }
);

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedAnime: (state) => {
      state.selectedAnime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch anime search results
      .addCase(fetchAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.data;
        state.totalPages = action.payload.pagination.last_visible_page;
        state.hasSearched = true;
      })
      .addCase(fetchAnime.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message !== "Request cancelled") {
          state.error = action.error.message || "Failed to fetch anime";
        }
      })
      // Fetch anime by ID
      .addCase(fetchAnimeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAnime = action.payload;
      })
      .addCase(fetchAnimeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch anime details";
      });
  },
});

export const {
  setSearchQuery,
  setCurrentPage,
  clearError,
  clearSelectedAnime,
} = animeSlice.actions;

export default animeSlice.reducer;
