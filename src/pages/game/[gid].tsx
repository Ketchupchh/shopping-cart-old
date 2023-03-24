import { MainContainer } from '@/components/layout/main-container';
import { GameView } from '@/components/game/game-view';
import { getAllGamesId, getGameData } from '@/components/lib/api/games';
import type { Game, Params } from '@/components/lib/api/games';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType
} from 'next';
import NotFound from '../404';

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
  const paths = await getAllGamesId();
  
  return {
    paths,
    fallback: 'blocking'
  };
}

type GameProps = {
  gameData: Game | null;
}

export async function getStaticProps({
  params
}: GetStaticPropsContext<Params>): Promise<GetStaticPropsResult<GameProps>> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { gid } = params!;
  const gameData = await getGameData(gid);

  return {
    props: {
      gameData
    }
  };
}

export default function Game({
  gameData,
}: InferGetStaticPropsType<typeof getStaticProps>) : JSX.Element
{
  return gameData ? ( 
    <>
      <MainContainer> 
        <GameView gameData={gameData}/>
      </MainContainer>
    </>
  ) : (
    <NotFound message='Game Not Found...'/>
  );
}