import { useGame } from "../context/GameContext";

const UserProfile = ({ profile }) => {
    const { pgn } = useGame();
    const wrapperClass = pgn
        ? "w-full h-[30%] flex-col items-center justify-center"
        : "w-1/3 h-full items-end";
    const imageClass = pgn
        ? "h-[85px] w-[85px] rounded-full"
        : "w-full h-full absolute rounded-3xl";

    return (
        <div className={`relative rounded-[20px] flex ${wrapperClass}`}>
            <img
                src={profile.avatar}
                alt="avatar"
                className={`object-cover -z-1 ${imageClass}`}
            />
            <div
                className={pgn ? "text-center text-[30px]" : "text-center p-4"}
            >
                <p className={pgn ? "text-[30px]" : "text-7xl"}>
                    {profile.username || "Username"}
                </p>
                <p
                    className={
                        pgn
                            ? "text-[15px] text-white/30"
                            : "text-2xl text-white/30"
                    }
                >
                    {profile.email || "Email"}
                </p>
            </div>
        </div>
    );
};

export default UserProfile;
