import { useSelector } from "react-redux";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";

const ProtectedLayout = ({ children }) => {
    const auth = useSelector((state) => state.auth.user);

    if (!auth) return <Navigate to={"/login"} replace />;

    return (
        <div className="min-h-screen">
            <Header />
            <div className="min-h-[85vh] w-screen grid place-items-center">
                {children}
            </div>
        </div>
    );
};

export default ProtectedLayout;
