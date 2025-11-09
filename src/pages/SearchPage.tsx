import { Alert, Empty, Layout, Pagination, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimeGrid } from "../components/AnimeGrid";
import { SearchBar } from "../components/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import {
  fetchAnime,
  setCurrentPage,
  setSearchQuery,
} from "../store/animeSlice";
import { type AppDispatch, type RootState } from "../store/store";

const { Content } = Layout;

export const SearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    results,
    loading,
    error,
    searchQuery,
    currentPage,
    totalPages,
    hasSearched,
  } = useSelector((state: RootState) => state.anime);

  const debouncedSearchQuery = useDebounce(searchQuery, 250);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      dispatch(fetchAnime({ query: debouncedSearchQuery, page: currentPage }));
    }
  }, [debouncedSearchQuery, currentPage, dispatch]);

  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value));
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ padding: "24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h1 style={{ fontSize: 48, marginBottom: 8 }}>Anime Search</h1>
            <p style={{ fontSize: 16, color: "#666", marginBottom: 24 }}>
              Discover your next favorite anime
            </p>
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
          </div>

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: 24 }}
            />
          )}

          {loading && (
            <div style={{ textAlign: "center", padding: 60 }}>
              <Spin size="large" />
            </div>
          )}

          {!loading && hasSearched && results.length === 0 && (
            <Empty
              description={
                searchQuery
                  ? `No results found for "${searchQuery}"`
                  : "Start typing to search for anime"
              }
            />
          )}

          {!loading && results.length > 0 && (
            <>
              <AnimeGrid anime={results} />
              <div style={{ textAlign: "center", marginTop: 40 }}>
                <Pagination
                  current={currentPage}
                  total={totalPages * 24}
                  pageSize={24}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            </>
          )}
        </div>
      </Content>
    </Layout>
  );
};
