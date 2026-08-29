import { ReactNode } from "react";

export type HeroLayoutProps = {
    children: ReactNode,
    color?: "white" | "gray"
}

export type ButtonProps = {
    children: ReactNode,
    color: string,
    href?: string
}