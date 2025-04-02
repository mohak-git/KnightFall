import { useSelector } from "react-redux";
import { useGetGames, useGetProfile } from "../api/queries";
import DashboardContent from "../components/DashboardContent";
import { GameProvider } from "../context/GameContext";

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const { data: profileRes } = useGetProfile(user);
    const profile = profileRes?.data?.data || {};
    const { data: gamesRes } = useGetGames(user);
    const games = gamesRes?.data?.data?.[0]?.gameHistory || [];
    games.reverse();

    return (
        <GameProvider games={games}>
            <DashboardContent profile={profile} />
        </GameProvider>
    );
};

export default Dashboard;
