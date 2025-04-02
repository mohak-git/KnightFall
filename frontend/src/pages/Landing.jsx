import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const Landing = () => {
    const auth = useSelector((state) => state.auth.user);

    if (auth) return <Navigate to={"/dashboard"} replace />;

    return (
        <div className="h-screen w-screen flex justify-center items-center gap-10 font-serif text-2xl">
            <Link to="/register" className="border px-4 py-2 rounded-md">
                Register
            </Link>

            <Link to="/login" className="border px-4 py-2 rounded-md">
                Login
            </Link>
        </div>
    );
};

export default Landing;
