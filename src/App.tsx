import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { DetailPage } from "./pages/DetailPage";
import { SearchPage } from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/anime/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
