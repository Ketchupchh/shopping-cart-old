import { motion } from "framer-motion";

type GameCardParallaxProps = {
    className?: string;
    duration?: number;
    src: string;
    alt: string;
}

export function GameCardParallax({
    className,
    duration,
    src,
    alt
} : GameCardParallaxProps) : JSX.Element
{
    return (
        <motion.div
            className={`"relative overflow-hidden shadow-black/[.40] shadow-xl ${className ?? "rounded-xl"}`}
            initial={{scale: 0.5}}
            animate={{scale: 1}}
            transition={{duration: duration ?? 0.5}}
            exit={{
                opacity: 0,
                scale: 0.5
            }}
        >
            <motion.img
              className='w-full h-full'
              src={src}
              alt={alt}
              animate={{scale: 1}}
              transition={{duration: duration ?? 0.5}}
              whileHover={{scale: 1.1}}
            >
            </motion.img>
        </motion.div>
    );
}