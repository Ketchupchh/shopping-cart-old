/*
id: 32,
slug: 'destiny-2',
name: 'Destiny 2',
released: '2017-09-06',
tba: false,
background_image: 'https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg',
rating: 3.56,
rating_top: 4,
ratings: [Array],
ratings_count: 2426,
reviews_text_count: 19,
added: 12120,
added_by_status: [Object],
metacritic: 82,
playtime: 5,
suggestions_count: 1167,
updated: '2023-03-19T23:48:05',
user_game: null,
reviews_count: 2452,
saturated_color: '0f0f0f',
dominant_color: '0f0f0f',
platforms: [Array],
parent_platforms: [Array],
genres: [Array],
stores: [Array],
clip: null,
tags: [Array],
esrb_rating: [Object],
short_screenshots: [Array]
*/

export type Game = {
  id: number;
  slug: string;
  name: string;
  description_raw: string;
  website: string;
  released: string;
  tba: boolean;
  background_image: string;
  background_image_additional: string;
  developers: {
    id: number;
    name: string;
    slug: string;
    image_background: string;
  }[];
  rating: string;
  ratings_count: string;
  reviews_text_count: number;
  added: string;
  metacritic: string;
  playtime: string;
  suggestions_count: string;
  updated: string;
  reviews_count: string;
  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    },
    requirements: {
      minimum: string;
      recommended: string;
    }
  }[];
  parentPlatforms: [];
  genres: [];
  stores: [];
  tags: [];
}

export type Games = Game[];

export async function getAllGames() : Promise<Games> {
  const res = await fetch(`https://rawg.io/api/games?token&key=${process.env.NEXT_PUBLIC_API_KEY}`);
  const data = (await res.json()).results as Games;

  return data;
}

export type Params = {
  gid: string
}

export type GameParams = {
  params: Params
}

export type GamesParams = GameParams[];

export async function getAllGamesId(): Promise<GamesParams> {
  const res = await getAllGames();

  return res.map((game) => ({
    params: {
      gid: game.id.toString()
    }
  }));
}

function isInDb(gid: string): boolean {
  if (isNaN(+gid)) return false;
  const num = parseInt(gid, 10);
  return num >= 1 && num <= 900000;
}

export async function getGameData(gid: string) : Promise<Game | null> {
  if (!isInDb(gid)) return null;
  const res = await fetch(`https://rawg.io/api/games/${gid}?token&key=${process.env.NEXT_PUBLIC_API_KEY}`);
  const data = (await res.json()) as Game;

  return data;    
}

export async function getGamesBySearch(game: string) : Promise<Games>
{
  const res = await fetch(`https://rawg.io/api/games?search=${game}?token&key=${process.env.NEXT_PUBLIC_API_KEY}`);
  const data = (await res.json()).results as Games;

  return data;
}