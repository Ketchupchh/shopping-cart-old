import { Game, Games, getAllGames } from "../lib/api/games";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GameCard } from "../game/game-card";


export function GamesListings() : JSX.Element
{
    const [games, setGames] = useState<Games>([]);

    useEffect(() => {
      async function fetchGames() {
        const gamesData = await getAllGames();
        setGames(gamesData);
      }
      fetchGames();
    }, []);

    return (
        <>
            <section className="w-[1200px] overflow-y-auto flex justify-center ml-40">
                <section className="grid grid-cols-3 gap-x-2 h-[810px] mt-10">
                    {games.map((game: Game) => (
                        <div key={game.id} className="mb-10 rounded-xl w-[330px]">
                            <GameCard href={`/game/${game.id}`} src={game.background_image} alt={game.slug} gameName={game.name} rating={game.rating}/>
                        </div>
                    ))}
                </section>
            </section>
        </>
    );
}