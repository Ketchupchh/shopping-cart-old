import { Background } from "@/components/layout/common/background";
import { MainContainer } from "@/components/layout/main-container";
import { GamesListings } from "@/components/store/games-listings";
import { Sidebar } from "@/components/store/sidebar/sidebar";
import { motion } from "framer-motion";


export default function Store() : JSX.Element
{
  return (
    <MainContainer>
      <section className="flex flex-row h-full justify-center">
        <Background image='/assets/fade.avif'/>
        <Sidebar/>
        <GamesListings/>
      </section>
    </MainContainer>
  );
}