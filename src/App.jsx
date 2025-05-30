import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/tailwind.css";
import Header from "./components/Header/Header";
import Error from "./pages/404/Error/Error";
import Login from "./pages/Auth/Login/Login";
import routes from "./routes/routes";

const MainLayout = ({ children }) => (
  <div className="bg-gray-50 min-h-screen">
    {/* <Header /> */}
    <main className=" mx-auto px-2 pt-1 ">{children}</main>
  </div>
);

const App = () => {
  const { pathname } = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {routes.map(({ path, element, title }) => (
        <Route
          key={title}
          path={path}
          element={<MainLayout>{element}</MainLayout>}
        />
      ))}
      <Route path="/404" element={<Error />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
