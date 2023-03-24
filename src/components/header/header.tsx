import Link from "next/link";
import { ShoppingCart } from "../shopping cart/shopping-cart";
import { HeroIcon } from "../ui/hero-icons";
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { KeyboardEvent } from 'react';

type HeaderProps = {
    margin?: boolean
}

export function Header({
    margin
} : HeaderProps) : JSX.Element
{

    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [searchValue, setSearchValue] = useState('');

    return (
        <header
            className={`bg-black/[.50] border-b border-solid border-black w-full h-20 flex items-center shadow shadow-lg shadow-black/[.60] z-[99] ${margin ? "mb-10" : ""}`}
        >
            <Link href="/">
                <div className="flex flex-row ml-4 space-x-4">
                    <HeroIcon iconName="ShoppingBagIcon" className="w-[60px] h-[60px] text-white"/>
                    <p className="text-white font-bold text-2xl mt-3">
                        Shopping Cart
                    </p>
                </div>
            </Link>

            <div className=" ml-auto px-4 flex items-center justify-center">

                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Search for game.."
                        variant="outlined"
                        value={searchValue}
                        onChange={(e) => {setSearchValue(e.target.value)}}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                router.push(`/search/${searchValue}`);
                            }
                        }}
                        sx={{
                            '& label': {
                              color: 'white',
                            },
                            '& .MuiInputBase-input': {
                              color: 'white',
                            },
                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'white',
                            },
                            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'white',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'white',
                            },
                          }}
                    />
                </Box>

                <Link className="px-4" href={`/search/${searchValue}`}>
                    <HeroIcon iconName="MagnifyingGlassIcon" className="w-8 h-8 text-white"/>
                </Link>

                <ShoppingCart isOpen={isModalOpen} onClose={handleCloseModal}/>

                <button
                    className="ml-4"
                    onClick={handleOpenModal}
                >
                    <HeroIcon iconName="ShoppingCartIcon" className="w-8 h-8 text-white"/>
                </button>
            </div>
        </header>    
    );
}