import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
    return (
        <div className="h-[10vh] sm:h-[15vh] w-screen flex justify-between items-center px-10 sm:px-20 md:px-30 lg:px-40 shadow-[0px_-28px_30px_30px_rgb(0,184,219)]">
            <div className="aspect-video w-15 sm:w-25 md:w-30 lg:w-40 rounded-2xl overflow-hidden">
                <Link to="/">
                    <img
                        src="/images/logo/logo.png"
                        alt="Logo"
                        className="h-full w-full scale-125"
                    />
                </Link>
            </div>

            <div className="h-2/5 w-50 sm:w-75 md:w-90 lg:w-120 px-1">
                <Navbar />
            </div>
        </div>
    );
};

export default Header;
