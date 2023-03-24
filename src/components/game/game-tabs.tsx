import { useState } from 'react'
import { Tab } from '@headlessui/react'
import type { Game } from '../lib/api/games'

type GameTabsProps = {
    requirementsIndex: number;
    gameData: Game;
}

export function GameTabs({
    requirementsIndex,
    gameData
} : GameTabsProps) : JSX.Element
{
    const {
        description_raw,
        platforms
    } = gameData;

    return (
        <div className='px-4 py-4'>
            <Tab.Group>
                <Tab.List className="text-white flex items-center justify-center gap-4">
                    {platforms[requirementsIndex]? (
                        <>
                            <Tab>Description</Tab>
                            <Tab>Requirements</Tab>
                        </>
                    ) : (
                        <Tab disabled>Description</Tab>
                    )}
                </Tab.List>
                <Tab.Panels className="mt-2 text-white">
                    <div className='border-b mb-4'></div>
                    <Tab.Panel>{description_raw}</Tab.Panel>
                    <Tab.Panel>{platforms[requirementsIndex]?.requirements.minimum}</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}