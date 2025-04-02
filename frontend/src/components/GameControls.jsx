const GameControls = ({ game, setBoard }) => {
    const handleAction = (action) => () => {
        if (action === "undo") game.undo();
        else if (action === "restart") game.reset();
        setBoard(game.board());
    };

    return (
        <div className="flex space-x-4 p-4">
            <button onClick={handleAction("undo")} className="btn">
                Undo
            </button>
            <button onClick={handleAction("restart")} className="btn">
                Restart
            </button>
        </div>
    );
};

export default GameControls;
