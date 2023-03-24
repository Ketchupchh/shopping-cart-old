import { useState, useEffect } from "react";
import { getGamesBySearch } from "@/components/lib/api/games";
import { useRouter } from "next/router";
import type { Games } from "@/components/lib/api/games";
import { MainContainer } from "@/components/layout/main-container";
import { Background } from "@/components/layout/common/background";
import { GamesList } from "@/components/layout/common/games-list";

export default function Search() : JSX.Element
{
    const router = useRouter();
    const {game} = router.query;

    const [games, setGames] = useState<Games>([]);

    useEffect(() => {
        async function fetchGames() {
            if (game) {
                const gamesData = await getGamesBySearch(game.toString());
                setGames(gamesData);
            }
        }
      fetchGames();
    },[game]);

    return (
        <>
            <MainContainer>
                <Background image="/assets/fade.avif"/>
                <section className="mt-10 flex items-center">
                    <div className="w-[650px] h-[760px] overflow-y-auto flex items-center justify-center">
                        <p className="text-5xl text-white font-bold mb-20">
                            {`You searched for "${game}"`}
                        </p>
                    </div>

                    <GamesList className="h-[750px]" games={games}/>
                </section>
            </MainContainer>
        </>
    )
}