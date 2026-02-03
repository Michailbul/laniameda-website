import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: "default" | "dark" | "glass";
}

export default function Card({ children, className, variant = "default" }: CardProps) {
    return (
        <div
            className={cn(
                "p-6 rounded-2xl transition-all duration-300",
                variant === "default" && "bg-white border border-gray-100 shadow-sm hover:shadow-md dark:bg-zinc-900 dark:border-zinc-800",
                variant === "dark" && "card-dark",
                variant === "glass" && "glass",
                className
            )}
        >
            {children}
        </div>
    );
}
