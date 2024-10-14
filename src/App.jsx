import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ContentMain } from './components/ContentMain.jsx'; // Ensure the path is correct
import { RegisterClient } from "./components/RegisterClient.jsx";
import { LoginClient } from "./components/LoginClient.jsx";
import { AuthContexProvider, AuthContext } from "./context/authContext.jsx";
import { DashboardMain } from "./components/DashboardMain.jsx";
import { FavoritesTickers } from "./components/FavoritesTickers.jsx";
import { useContext } from "react";

// Layout component to render child routes
const Layout = () => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <>
      <Outlet /> {/* Renders the matched child route */}
    </>
  );
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // If the user is not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContexProvider>
        <Layout />
      </AuthContexProvider>
    ),
    children: [
      {
        path: "/",
        element: <ContentMain />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterClient />,
  },
  {
    path: "/login",
    element: (
      <AuthContexProvider>
        <LoginClient />
      </AuthContexProvider>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AuthContexProvider>
        <ProtectedRoute>
          <DashboardMain />
        </ProtectedRoute>
      </AuthContexProvider>
    ),
  },
  {
    path: "/dashboard/:id",
    element: (
      <AuthContexProvider>
        <ProtectedRoute>
          <DashboardMain />
        </ProtectedRoute>
      </AuthContexProvider>
    ),
  },
  {
    path: "/favorites",
    element: (
      <AuthContexProvider>
        <ProtectedRoute>
          <FavoritesTickers />
        </ProtectedRoute>
      </AuthContexProvider>
    ),
  },
  {
    path: "/favorites/:id",
    element: (
      <AuthContexProvider>
        <ProtectedRoute>
          <FavoritesTickers />
        </ProtectedRoute>
      </AuthContexProvider>
    ),
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
