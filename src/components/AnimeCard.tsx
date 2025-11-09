import { StarFilled } from "@ant-design/icons";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { type AnimeData } from "../services/api";

interface AnimeCardProps {
  anime: AnimeData;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      cover={
        <img
          alt={anime.title}
          src={anime.images.jpg.image_url}
          style={{ height: 300, objectFit: "cover" }}
        />
      }
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
      style={{ height: "100%" }}
    >
      <Card.Meta
        title={
          <div style={{ minHeight: 48 }}>
            {anime.title_english || anime.title}
          </div>
        }
        description={
          <div>
            {anime.score && (
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <StarFilled style={{ color: "#fadb14" }} />
                <span>{anime.score}</span>
              </div>
            )}
            <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
              {anime.type} • {anime.episodes ? `${anime.episodes} eps` : "N/A"}
            </div>
          </div>
        }
      />
    </Card>
  );
};
