import { ArrowLeftOutlined, StarFilled } from "@ant-design/icons";
import { Alert, Button, Descriptions, Layout, Spin, Tag } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearSelectedAnime, fetchAnimeById } from "../store/animeSlice";
import { type AppDispatch, type RootState } from "../store/store";

const { Content } = Layout;

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedAnime, loading, error } = useSelector(
    (state: RootState) => state.anime
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeById(parseInt(id)));
    }

    return () => {
      dispatch(clearSelectedAnime());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
        <Content style={{ padding: "24px", textAlign: "center" }}>
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
        <Content style={{ padding: "24px" }}>
          <Alert message="Error" description={error} type="error" showIcon />
          <Button onClick={() => navigate("/")} style={{ marginTop: 16 }}>
            Back to Search
          </Button>
        </Content>
      </Layout>
    );
  }

  if (!selectedAnime) {
    return null;
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ padding: "24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/")}
            style={{ marginBottom: 24 }}
          >
            Back to Search
          </Button>

          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: "0 0 300px", maxWidth: "100%" }}>
                <img
                  src={selectedAnime.images.jpg.large_image_url}
                  alt={selectedAnime.title}
                  style={{ width: "100%", display: "block" }}
                />
              </div>

              <div style={{ flex: 1, padding: 32, minWidth: 300 }}>
                <h1 style={{ fontSize: 32, marginBottom: 8 }}>
                  {selectedAnime.title_english || selectedAnime.title}
                </h1>
                {selectedAnime.title_english && (
                  <p style={{ color: "#666", fontSize: 16, marginBottom: 16 }}>
                    {selectedAnime.title}
                  </p>
                )}

                {selectedAnime.score && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 16,
                    }}
                  >
                    <StarFilled style={{ color: "#fadb14", fontSize: 24 }} />
                    <span style={{ fontSize: 24, fontWeight: "bold" }}>
                      {selectedAnime.score}
                    </span>
                    <span style={{ color: "#666" }}>/ 10</span>
                  </div>
                )}

                <div style={{ marginBottom: 16 }}>
                  {selectedAnime.genres.map((genre) => (
                    <Tag key={genre.mal_id} color="blue">
                      {genre.name}
                    </Tag>
                  ))}
                </div>

                <Descriptions column={1} bordered style={{ marginBottom: 24 }}>
                  <Descriptions.Item label="Type">
                    {selectedAnime.type || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Episodes">
                    {selectedAnime.episodes || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    {selectedAnime.status}
                  </Descriptions.Item>
                  <Descriptions.Item label="Duration">
                    {selectedAnime.duration || "N/A"}
                  </Descriptions.Item>
                  {selectedAnime.year && (
                    <Descriptions.Item label="Year">
                      {selectedAnime.year}
                    </Descriptions.Item>
                  )}
                  {selectedAnime.rating && (
                    <Descriptions.Item label="Rating">
                      {selectedAnime.rating}
                    </Descriptions.Item>
                  )}
                  {selectedAnime.studios.length > 0 && (
                    <Descriptions.Item label="Studios">
                      {selectedAnime.studios.map((s) => s.name).join(", ")}
                    </Descriptions.Item>
                  )}
                </Descriptions>

                {selectedAnime.synopsis && (
                  <div>
                    <h3 style={{ marginBottom: 12 }}>Synopsis</h3>
                    <p style={{ lineHeight: 1.8, color: "#555" }}>
                      {selectedAnime.synopsis}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};
