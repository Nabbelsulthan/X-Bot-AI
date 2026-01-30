import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Chat from "./pages/Chat";
import History from "./pages/History";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
