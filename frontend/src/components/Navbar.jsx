import ToggleTheme from "./ToggleTheme";
import Logout from "./Logout";
import { MdDashboard, MdVideogameAsset } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const tabs = {
        dashboard: {
            title: "Dashboard",
            icon: <MdDashboard className="inline align-[-3px] size-6" />,
        },
        game: {
            title: "Game",
            icon: <MdVideogameAsset className="inline align-[-3px] size-6" />,
        },
    };

    return (
        <ul className="relative h-full w-full flex justify-center items-center gap-24">
            {Object.values(tabs).map((tab, idx) => (
                <li key={idx} className="p-1 text-lg font-serif">
                    <NavLink
                        to={`/${tab.title.toLowerCase()}`}
                        className={({ isActive }) =>
                            `group relative flex justify-center items-center ${
                                isActive && "text-pink-700"
                            }`
                        }
                    >
                        <span className="absolute group-hover:opacity-0 group-hover:scale-0 transition-all duration-500">
                            {tab.icon}
                        </span>
                        <span className="absolute opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                            {tab.title}
                        </span>
                    </NavLink>
                </li>
            ))}

            <Logout />
            <ToggleTheme />
        </ul>
    );
};

export default Navbar;
