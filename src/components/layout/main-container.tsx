import { ReactNode } from "react";
import { Header } from "../header/header";

type MainContainerProps = {
    children: ReactNode;
}

export function MainContainer({
    children
} : MainContainerProps) : JSX.Element
{
    return (
        <div className="sticky flex flex-col items-center min-w-screen min-h-screen">
            <Header/>
            {children}
        </div>
    );
}