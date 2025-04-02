import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../store/themeSlice";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
    const theme = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();

    return (
        <button
            className="rounded-full w-16 h-8 p-2 ring-2 flex items-center justify-between relative overflow-hidden"
            onClick={() => dispatch(toggleMode())}
        >
            {theme === "dark" ? (
                <div className="absolute left-2">
                    <MdLightMode />
                </div>
            ) : (
                <div className="absolute right-2">
                    <MdDarkMode />
                </div>
            )}
            <div
                className={`absolute size-6  rounded-full transition-transform duration-300 ${
                    theme === "dark"
                        ? "translate-x-6 bg-white"
                        : "translate-x-0 bg-black"
                }`}
            ></div>
        </button>
    );
};

export default ThemeToggle;
