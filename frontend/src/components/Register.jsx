import { useState } from "react";
import { useRegister } from "../api/mutations";
import { Link } from "react-router-dom";

const Register = () => {
    const registerMutation = useRegister();
    const [details, setDetails] = useState({
        username: "",
        email: "",
        password: "",
        avatar: null,
    });

    const handleDataChange = (e) =>
        setDetails({ ...details, [e.target.name]: e.target.value });

    const handleFileChange = (e) =>
        setDetails({ ...details, avatar: e.target.files[0] });

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = new FormData();
        userData.append("username", details.username);
        userData.append("email", details.email);
        userData.append("password", details.password);
        userData.append("avatar", details.avatar);

        registerMutation.mutate(userData);
        setDetails({ username: "", email: "", password: "", avatar: null });
    };

    return (
        <div className="h-screen w-screen grid place-items-center">
            <form
                className="border-2 h-150 w-100 md:w-120 flex flex-col items-center justify-center gap-5"
                onSubmit={handleSubmit}
            >
                <div className="h-1/7 w-3/5 flex justify-center items-center text-3xl">
                    Register
                </div>

                <div
                    className="h-3/5 md:w-3/5 flex flex-col justify-center gap-9 *:flex *:items-center *:justify-between
                "
                >
                    <label>
                        Email :
                        <input
                            type="email"
                            name="email"
                            className="border h-8 p-2 rounded-[5px]"
                            value={details.email}
                            onChange={handleDataChange}
                            required
                        />
                    </label>

                    <label>
                        Username :
                        <input
                            type="text"
                            name="username"
                            className="border h-8 p-2 rounded-[5px]"
                            value={details.username}
                            onChange={handleDataChange}
                            required
                        />
                    </label>

                    <label>
                        Password :
                        <input
                            type="password"
                            name="password"
                            className="border h-8 p-2 rounded-[5px]"
                            value={details.password}
                            onChange={handleDataChange}
                            required
                        />
                    </label>

                    <label>
                        Avatar :
                        <input
                            type="file"
                            name="avatar"
                            className="border w-60 sm:w-50 rounded-[5px]"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </label>
                    
                    <div className="h-1/10 w-3/5 place-self-center grid justify-center! ">
                        <button
                            type="submit"
                            className="border px-2 py-1 rounded-full"
                            disabled={registerMutation.isPending}
                        >
                            Register
                        </button>
                    </div>
                </div>

                <div className="text-xs">
                    Already registered?
                    <Link
                        to="/login"
                        className="text-lg px-2 rounded-full hover:text-sky-400 transition-all duration-300"
                    >
                        <em>Login</em>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
