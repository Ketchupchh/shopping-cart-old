import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { HeroIcon } from "../ui/hero-icons";
import Link from "next/link";
import { GameCardParallax } from "../game/game-card-parallax";
import { useCart, CartItem } from "../lib/context/cart-context";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    item?: CartItem;
}

export function ShoppingCart({
    isOpen,
    onClose,
    item
} : ModalProps) : JSX.Element
{
    const { cartItems, removeFromCart } = useCart();

    return (
        <>
            {isOpen && (
                <motion.div
                    className="fixed z-100 inset-0 overflow-y-auto"
                >
                    <Dialog
                        open={isOpen}
                        onClose={onClose}
                        className="fixed inset-0 z-99 overflow-y-auto"
                    >
                        <div className="flex items-center justify-center min-h-screen">
                            
                            <Dialog.Panel
                            >
                                <motion.div
                                    className="bg-gray-800 rounded-xl w-96 h-96"
                                    initial={{scale: 0}}
                                    animate={{scale: 1}}
                                    transition={{duration: 0.2}}
                                >
                                    <div className="flex items-center justify-center">
                                        <button
                                            className="absolute -ml-[350px] mt-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            onClick={onClose}
                                        >
                                            <span className="sr-only">Close</span>
                                            <HeroIcon iconName="XMarkIcon" className="h-6 w-6"/>
                                        </button>
                                        <Dialog.Title className="text-lg font-medium text-white">
                                            Cart
                                        </Dialog.Title>
                                    </div>
                                    
                                    {cartItems.length >= 1 ? (
                                        <>
                                            <div className="h-full overflow-y-auto">
                                                {cartItems.map((item) => (
                                                    <div key={item.item_id}>
                                                        <div className="flex flex-row items-center mt-2">
                                                            <button
                                                                onClick={() => removeFromCart(item.item_id)}
                                                            >
                                                                <HeroIcon iconName="TrashIcon" className="w-6 h-6 text-red-500 ml-2"/>
                                                            </button>
            
                                                            <div className="border-l-2 h-10 w-5 ml-2"></div>
            
                                                            <Link href={`/game/${item.item_id}`}>
                                                                <div className="bg-gray-500 hover:bg-gray-900 rounded-xl w-[300px] h-20 flex flex-row">
                                                                    <GameCardParallax className="rounded-l-xl" src={item.item_image} alt={item.item_name}/>
                                                                    <div className="border-r"></div>
                                                                    <p className="text-white px-2">
                                                                        {item.item_name}
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ): (
                                        <>
                                            <div className="flex items-center justify-center">
                                                <p className="text-white">
                                                    Your cart is empty.
                                                </p>
                                            </div>
                                        </>
                                    )}

                                </motion.div>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </motion.div>
            )}
        </>
    );
}