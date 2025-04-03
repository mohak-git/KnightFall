import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../store/themeSlice";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
    const theme = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();

    return (
        <button
            className="rounded-full size-full p-2 ring sm:ring-2 flex items-center justify-between relative overflow-hidden"
            onClick={() => dispatch(toggleMode())}
        >
            {theme === "dark" ? (
                <div className="absolute left-1 sm:left-1.5 lg:left-2">
                    <MdLightMode className="size-3 sm:size-4 lg:size-5" />
                </div>
            ) : (
                <div className="absolute right-1 sm:right-1.5 lg:right-2">
                    <MdDarkMode className="size-3 sm:size-4 lg:size-5" />
                </div>
            )}
            <div
                className={`absolute size-3 sm:size-4 md:size-5 lg:size-6 rounded-full transition-transform duration-300 ${
                    theme === "dark"
                        ? "translate-x-3 sm:translate-x-4.5 md:translate-x-5 lg:translate-x-6 bg-white"
                        : "-translate-x-0.5 sm:translate-x-0 bg-black"
                }`}
            ></div>
        </button>
    );
};

export default ThemeToggle;
