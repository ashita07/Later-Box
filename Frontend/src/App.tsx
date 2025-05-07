import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TwitterPage } from "./pages/TwitterPage";
import YoutubePage from "./pages/YoutubePage";
import { DashboardLayout } from "./Layouts/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Specific Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="twitter" element={<TwitterPage />} />
          <Route path="youtube" element={<YoutubePage />} />
        </Route>

        {/* Catch-all Route - should be the last one */}
        <Route path="/*" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
