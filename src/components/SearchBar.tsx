import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search for anime...",
}) => {
  return (
    <Input
      size="large"
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ maxWidth: 600, margin: "0 auto" }}
    />
  );
};
