import { MdOutlineLogout } from "react-icons/md";
import { useLogout } from "../api/mutations";

const Logout = () => {
    const logoutMutation = useLogout();

    const handleClick = () => logoutMutation.mutate();

    return (
        <button
            type="submit"
            onClick={handleClick}
            className="text-lg group relative flex justify-center items-center"
        >
            <MdOutlineLogout className="absolute size-6 group-hover:scale-0 group-hover:opacity-0 transition-all duration-500" />
            <span className="font-serif absolute scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ">
                Logout
            </span>
        </button>
    );
};

export default Logout;
