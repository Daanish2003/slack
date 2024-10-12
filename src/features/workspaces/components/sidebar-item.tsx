import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

interface SidebarItemProps {
    label: string;
    id: string;
    icon: LucideIcon | IconType;
}

export const SidebarItem = ({
    label,
    id,
    icon: Icon
}: SidebarItemProps) => {
 return (
    <Button>
    </Button>
 )
}