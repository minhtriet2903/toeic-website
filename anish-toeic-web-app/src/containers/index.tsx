import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "../components";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import routes from "../routes";
import { routePaths } from "../routes/helpers";

const App = () => {
  const location = useLocation();

  return (
    <div className="h-screen flex-col flex justify-between">
      {!location.pathname.includes("exams/") &&
        location.pathname !== routePaths.login && <Navbar />}
      <Routes>
        {routes
          .filter((r) => !r.private)
          .map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}

        <Route element={<ProtectedRoute />}>
          {routes
            .filter((r) => r.private)
            .map((r) => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}
        </Route>
      </Routes>
      {!location.pathname.includes("admin") && <Footer />}
    </div>
  );
};

export default App;
