import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
    return (
        <div className="h-[15vh] w-screen flex justify-between items-center px-30 shadow-[0px_-28px_30px_30px_rgb(0,184,219)]">
            <div className="h-2/3 w-1/10 rounded-2xl overflow-hidden">
                <Link to="/">
                    <img
                        src="/images/logo/logo.png"
                        alt="Logo"
                        className="h-full w-full"
                    />
                </Link>
            </div>

            <div className="h-4/5 w-1/2">
                <Navbar />
            </div>
        </div>
    );
};

export default Header;
