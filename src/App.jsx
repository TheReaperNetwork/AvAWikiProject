import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CharacterPage from "./pages/CharacterPage";
import Trivia from "./pages/Trivia";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app-root with-sidebar">
      <Sidebar />
      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/:slug" element={<CharacterPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;