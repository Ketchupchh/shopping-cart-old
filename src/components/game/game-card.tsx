import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type GameCardProps = {
  href?: string;
  src: string;
  alt: string;
  gameName: string;
  rating: string
}

export function GameCard({
  href,
  src,
  alt,
  gameName,
  rating
} : GameCardProps) : JSX.Element
{
  return (
    <div className="w-full h-full">
      <motion.div
        className='relative overflow-hidden rounded-xl shadow-black/[.40] shadow-xl'
        initial={{scale: 0.5}}
        animate={{scale: 1}}
        transition={{duration: 0.5}}
        whileHover={{
          scale: 1.1,
          zIndex: 99
        }}
      >
        <Link href={href ?? ''} className="relative overflow-hidden">
          
          <Image
            className='rounded-xl'
            src={src ?? ""}
            alt={alt}
            width={1000}
            height={1000}
            quality={100}
            style={{
              width: "400px",
              height: "300px",
              maxHeight: "500px",
              maxWidth: "500px",
            }}
          >
          </Image>

          <motion.div
            className='absolute top-0 w-full h-full overflow-hidden'
            initial={{opacity: 0}}
            whileHover={{opacity: 1, }}
            transition={{duration: 0.5}}
          >
            <div className="absolute bottom-0 w-full bg-gray-600/[.60] rounded-b-xl flex flex-col px-2">
              <p className="font-bold text-white">{gameName}</p>
              <p>User Rating: {rating}</p>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}