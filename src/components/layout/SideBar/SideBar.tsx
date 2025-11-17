import React from 'react'
import { Gamepad2 , Calendar, Home, ShoppingBag, Recycle, Store, ShoppingCart, Heart, LogIn, Newspaper , Info } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from '@/components/layout/common/Toggle'
import { Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import Link from 'next/link'
// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Shops",
        url: "/shop",
        icon: ShoppingBag,
    },
    {
        title: "Events",
        url: "/events",
        icon: Calendar,
    },
    {
        title: "Recycle",
        url: "/recycle",
        icon: Recycle,
    },
    {
        title: "News",
        url: "/news",
        icon: Newspaper,
    },
    {
        title: "Store",
        url: "/store",
        icon: Store,
    },
    {
        title: "Game",
        url: "/game",
        icon: Gamepad2,
    },
    {
        title: "About",
        url: "/about",
        icon: Info,
    },
]

export default function SideBar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader >
                <SidebarTrigger />
                <ModeToggle />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroupContent className='gap-2'>
                    <SidebarMenu>
                        <SidebarMenuItem >
                            <SidebarMenuButton asChild >
                                <Link href="/fav">
                                    <Heart />
                                    <span>Favourite</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem >
                            <SidebarMenuButton asChild >
                                <Link href="/cart">
                                    <ShoppingCart />
                                    <span>cart</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                      
                        <SidebarMenuItem >
                            <SidebarMenuButton asChild >
                                <Link href="/auth">
                                    <LogIn />
                                    <span>Login</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton >
                                <Avatar className='size-6'>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span>Profile</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>

            </SidebarFooter>
        </Sidebar>
    )
}
