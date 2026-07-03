import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Onboarding } from "@/pages/Onboarding";
import { Chat } from "@/pages/Chat";
import { Profile } from "@/pages/Profile";
import { Brommunity } from "@/pages/Brommunity";
import { Wisdom } from "@/pages/Wisdom";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/brommunity" element={<Brommunity />} />
        <Route path="/wisdom" element={<Wisdom />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
