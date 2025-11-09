import { Col, Row } from "antd";
import { type AnimeData } from "../services/api";
import { AnimeCard } from "./AnimeCard";

interface AnimeGridProps {
  anime: AnimeData[];
}

export const AnimeGrid: React.FC<AnimeGridProps> = ({ anime }) => {
  return (
    <Row gutter={[16, 16]}>
      {anime.map((item) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.mal_id}>
          <AnimeCard anime={item} />
        </Col>
      ))}
    </Row>
  );
};
