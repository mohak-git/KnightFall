import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import Play from "./pages/Play";
import Game from "./pages/Game";
import Landing from "./pages/Landing";

const App = () => {
    const theme = useSelector((state) => state.theme.mode);
    useEffect(() => document.body.setAttribute("theme", theme), [theme]);

    const router = createBrowserRouter([
        {
            path: "/",
            errorElement: <Error />,
            children: [
                {
                    path: "/",
                    element: <Landing />,
                },
                {
                    path: "/register",
                    element: <Register />,
                },
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "/dashboard",
                    element: (
                        <ProtectedLayout>
                            <Dashboard />
                        </ProtectedLayout>
                    ),
                },
                {
                    path: "/game",
                    element: (
                        <ProtectedLayout>
                            <Game />
                        </ProtectedLayout>
                    ),
                },
                {
                    path: "/game/ongoing/:gameId",
                    element: (
                        <ProtectedLayout>
                            <Play />
                        </ProtectedLayout>
                    ),
                },
            ],
        },
        {
            path: "*",
            element: <Error />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
