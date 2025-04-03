import ToggleTheme from "./ToggleTheme";
import Logout from "./Logout";
import { MdDashboard, MdVideogameAsset } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const tabs = {
        dashboard: {
            title: "Dashboard",
            icon: (
                <MdDashboard className="inline align-[-3px] size-4 sm:size-6" />
            ),
        },
        game: {
            title: "Game",
            icon: (
                <MdVideogameAsset className="inline align-[-3px] size-4 sm:size-6" />
            ),
        },
    };

    return (
        <ul className="relative h-full w-full flex justify-center items-center gap-6 sm:gap-16 md:gap-20 lg:gap-24">
            {Object.values(tabs).map((tab, idx) => (
                <li key={idx} className="size-10 p-1 text-lg font-serif">
                    <NavLink
                        to={`/${tab.title.toLowerCase()}`}
                        className={({ isActive }) =>
                            `group relative flex justify-center items-center ${
                                isActive && "text-pink-700"
                            }`
                        }
                    >
                        <span className="absolute top-0 group-hover:opacity-0 group-hover:scale-0 transition-all duration-500">
                            {tab.icon}
                        </span>
                        <span className="absolute top-0 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                            {tab.title}
                        </span>
                    </NavLink>
                </li>
            ))}

            <li className="size-10 p-1 text-lg font-serif">
                <Logout />
            </li>
            <li className="w-16 h-5 sm:w-40 sm:h-6 md:w-36 md:h-7 lg:w-16 lg:h-8 text-lg font-serif">
                <ToggleTheme />
            </li>
        </ul>
    );
};

export default Navbar;
