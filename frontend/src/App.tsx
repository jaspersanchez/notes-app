import { AuthProvider } from "./context/AuthProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import { useEffect } from "react";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }
  }, [setUser]);

  return user ? <Navigate to="/notes" /> : <>{children}</>;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
