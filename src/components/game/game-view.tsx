import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { Header } from "../header/header";
import { Background } from "../layout/common/background";
import { useCart } from "../lib/context/cart-context";
import { GameTabs } from "./game-tabs";
import { CartItem } from "../lib/context/cart-context";
import type { Game } from "../lib/api/games";

type GameViewProps = {
    gameData: Game
}

export function GameView({
    gameData
} : GameViewProps) : JSX.Element
{
    const {
        id,
        slug,
        name,
        website,
        released,
        tba,
        background_image,
        background_image_additional,
        developers,
        rating,
        ratings_count,
        added,
        metacritic,
        suggestions_count,
        updated,
        reviews_count,
        platforms,
        genres,
    } = gameData;

    const requirementsIndex = platforms.findIndex(r => r.requirements.minimum !== undefined);

    const {cartItems, addToCart, removeFromCart} = useCart();

    let isInCart = cartItems.find(item => item.item_id === String(id));

    useEffect(() => {
        isInCart = cartItems.find(item => item.item_id === String(id));
    },[cartItems]);

    return (
        <>
            <Background image={background_image}/>
            
            <motion.section
                className="mt-5"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
                exit={{
                    opacity: 0
                }}
            >
                <motion.div
                    className="inline-block ml-96 mr-4"
                    initial={{scale: 0.5}}
                    animate={{scale: 1}}
                    transition={{duration: 0.5}}
                    whileHover={{scale: 1.1}}
                >
                    <a
                        className="text-white font-bold text-2xl"
                        href={website}
                        target="_blank"
                    >
                        {name}
                    </a>
                </motion.div>
                
                <motion.button
                    className="rounded border border-white bg-black/[.50]"
                    initial={{scale: 0.5}}
                    animate={{scale: 1}}
                    transition={{duration: 0.5}}
                    whileHover={{scale: 1.1}}
                    onClick={()=>{
                        if(isInCart === undefined)
                        {
                            const item: CartItem = {
                                item_id: String(id),
                                item_name: name,
                                item_image: background_image,
                            }
                            addToCart(item);
                            return;
                        }
                        removeFromCart(String(id));
                    }}
                >
                    {isInCart ? (
                        <p className="text-white font-bold px-5 hover:text-red-500/[.50]">Remove From Cart</p>
                    ) : (
                        <p className="text-white px-5">Add To Cart</p>
                    )}
                </motion.button>

                <section className="flex flex-col w-full px-96">
                    <div className="flex flex-cols gap-4 mt-5">
                        <div>
                            <motion.img
                                className="rounded-xl shadow shadow-md shadow-black/[.50]"
                                src={background_image_additional}
                                alt={slug}
                                height={500}
                                width={700}
                                layout="position"
                                initial={{scale: 0.5}}
                                animate={{scale: 1}}
                                whileHover={{scale: 1.01}}
                                transition={{duration: 0.5}}
                            />

                            <motion.div
                                className="w-[700px] h-[360px] max-w-40 rounded-xl mt-5 overflow-y-auto bg-black/[.50] shadow shadow-md shadow-black/[.50]"
                                initial={{scale: 0.5}}
                                animate={{scale: 1}}
                                transition={{duration: 0.7}}
                            >
                                <GameTabs gameData={gameData} requirementsIndex={requirementsIndex} />
                            </motion.div>
                        </div>
                        <div>
                            <motion.img
                                className="rounded-xl shadow shadow-md shadow-black/[.50]"
                                src={background_image}
                                alt={slug + "2"}
                                height={500}
                                width={400}
                                layout="position"
                                initial={{scale: 0.5}}
                                animate={{scale: 1}}
                                whileHover={{scale: 1.05}}
                                transition={{duration: 0.6}}
                            />
                            
                            <motion.div
                                className="rounded-xl w-96 h-96 mt-5 relative bg-black/[.50] shadow shadow-md shadow-black/[.50]"
                                initial={{scale: 0.5}}
                                animate={{scale: 1}}
                                transition={{duration: 0.8}}
                            >
                                <p className="mt-1 text-gray-600 px-4 py-2">
                                    RELEASE DATE: {released}
                                </p>

                                <p className="-mt-2 text-gray-600 px-4">
                                    RATING: {rating} ({ratings_count})
                                </p>

                                <p className="text-gray-600 px-4">
                                    METACRITIC: {metacritic}
                                </p>

                                <p className="text-gray-600 px-4">
                                    IN CARTS: {added}
                                </p>

                                <p className="text-gray-600 px-4">
                                    SUGGESTED: {suggestions_count}
                                </p>

                                <p className="text-gray-600 px-4">
                                    REVIEWS: {reviews_count}
                                </p>

                                <p className="text-gray-600 px-4">
                                    UPDATED AT: {updated}
                                </p>

                                <div className="overflow-y-auto h-10 mb-4">
                                    <p className="text-gray-600 px-4 py-1">
                                        GENRES: {genres.map(({name}, index) => (
                                            <span key={index} className="mr-2">{name}{index !== developers.length - 1 && ','}</span>
                                        ))}
                                    </p>
                                </div>
                                
                                <div className="overflow-y-auto h-10 absolute bottom-0 mb-4">
                                    <p className="text-gray-600 px-4 py-1">
                                        DEVELOPER: {developers.map(({name}, index) => (
                                            <span key={index} className="mr-2">{name}{index !== developers.length - 1 && ','}</span>
                                        ))}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>    
                </section>

            </motion.section>
        </>
    );
}