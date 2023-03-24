import { GameCardParallax } from "@/components/game/game-card-parallax";
import { Background } from "@/components/layout/common/background";
import { MainContainer } from "@/components/layout/main-container";
import { motion } from "framer-motion";

type NotFoundProps = {
    message: string;
}

export default function NotFound({
    message
} : NotFoundProps) : JSX.Element
{
    return (
        <MainContainer>
            <Background image="/assets/fade.avif"/>
            <motion.p
                className="text-white font-bold text-5xl mt-10 mb-10"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{
                    opacity: 0,
                }}
            >
                {message}
            </motion.p>
            <GameCardParallax className="w-[1000px]" src="/assets/games/dmc-5.jpg" alt="control"/>
        </MainContainer>
    );
}