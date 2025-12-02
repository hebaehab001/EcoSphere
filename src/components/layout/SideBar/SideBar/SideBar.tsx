import React from 'react'
import { Gamepad2, Calendar, Home, ShoppingBag, Recycle, Store, ShoppingCart, Heart, LogIn, Newspaper, Info } from "lucide-react"
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
    SidebarMenuBadge
} from "@/components/ui/sidebar"
import { MdOutlineAddToPhotos, MdOutlineSearch, MdOutlineEventRepeat } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import Link from 'next/link'
import ThemeBtn from '../ThemeBtn/ThemeBtn'
import UserBtn from '../UserBtn/UserBtn'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import GetFavCount from '@/frontend/Actions/GetFavCount'
import { useTranslations } from 'next-intl';
// Menu items.
export default function SideBar() {
    const t = useTranslations('Layout.Sidebar');

    // Menu items.
    const items = [
        {
            title: t('menu.home'),
            url: "/",
            icon: Home,
        },
        {
            title: t('menu.shops'),
            url: "/shop",
            icon: ShoppingBag,
        },
        {
            title: t('menu.events'),
            url: "/events",
            icon: Calendar,
        },
        {
            title: t('menu.recycle'),
            url: "/recycle",
            icon: Recycle,
        },
        {
            title: t('menu.news'),
            url: "/news",
            icon: Newspaper,
        },
        {
            title: t('menu.store'),
            url: "/store",
            icon: Store,
        },
        {
            title: t('menu.game'),
            url: "/game",
            icon: Gamepad2,
        },
        {
            title: t('menu.about'),
            url: "/about",
            icon: Info,
        },
    ]

    const dashboardItems = [
        {
            title: t('dashboard.overview'),
            url: "/overview",
            icon: RxDashboard,
        },
        {
            title: t('dashboard.addEvent'),
            url: "/",
            icon: MdOutlineAddToPhotos,
        },
        {
            title: t('dashboard.browseEvents'),
            url: "/",
            icon: MdOutlineSearch,
        },
        {
            title: t('dashboard.eventDetails'),
            url: "/",
            icon: MdOutlineEventRepeat,
        },
    ]

    return (
        <Sidebar collapsible="icon" variant='floating' className='bg-background '>
            <SidebarHeader >
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{t('groups.application')}</SidebarGroupLabel>
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
                <SidebarGroup>
                    <SidebarGroupLabel>{t('groups.dashboard')}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {dashboardItems.map((item) => (
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
                                    <span>{t('footer.favorite')}</span>
                                    <GetFavCount />
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem >
                            <SidebarMenuButton asChild >
                                <Link href="/cart">
                                    <ShoppingCart />
                                    <span>{t('footer.cart')}</span>
                                    <SidebarMenuBadge>24</SidebarMenuBadge>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem >
                            <SidebarMenuButton asChild >
                                <Link href="/auth">
                                    <LogIn />
                                    <span>{t('footer.login')}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <ThemeBtn />
                        <LanguageSwitcher />
                        <UserBtn />
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarFooter>
        </Sidebar>
    )
}
