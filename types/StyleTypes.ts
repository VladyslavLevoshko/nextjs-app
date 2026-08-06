import { ReactNode } from "react";

export type HeroLayoutProps = {
    children: ReactNode,
    className?: string
}

export type ButtonProps = {
    children: ReactNode,
    color: string,
    href?: string
}