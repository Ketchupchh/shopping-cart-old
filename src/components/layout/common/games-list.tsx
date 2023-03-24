import { GameCard } from "@/components/game/game-card";
import type { Games, Game } from "@/components/lib/api/games";

type GamesList = {
    className?: string;
    games: Games;
};

export function GamesList({
    className,
    games
} : GamesList) : JSX.Element
{
    return (
        <section className={`w-[1200px] overflow-y-auto flex justify-center ${className ?? ""}`}>
            <section className="grid grid-cols-3 gap-x-2 h-[810px] mt-10">
                {games.map((game: Game) => (
                    <>
                        {game.background_image !== null && (

                            <div key={game.id} className="mb-10 rounded-xl w-[330px]">
                                <GameCard href={`/game/${game.id}`} src={game.background_image} alt={game.slug} gameName={game.name} rating={game.rating}/>
                            </div>
                        )}
                    </>
                ))}
            </section>
        </section>
    );
}