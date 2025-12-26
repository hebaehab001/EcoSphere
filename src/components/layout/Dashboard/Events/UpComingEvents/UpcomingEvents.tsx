import React from 'react'
import { useTranslations } from "next-intl";
import { EventProps } from "@/types/EventTypes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MainDisplayEvents from '@/components/layout/common/events/MainDisplayEvents';

export default function UpcomingEvents({ events }: EventProps) {
    const t = useTranslations("Events.displayEvents");
    const sortedEvents = [...events].sort(
        (a, b) =>
            new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = sortedEvents.filter(
        (event) => new Date(event.eventDate) >= today
    );
    return (
        <div className="min-h-screen py-8 w-[85%] mx-auto flex flex-col gap-6">
            <h1 className="capitalize font-bold text-4xl text-center  text-foreground">
                {t("UpComingEvents")}
            </h1>

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 ? (
                <section >
                    <MainDisplayEvents events={upcomingEvents} />
                </section>
            ) : (
                <div className="text-center w-full p-8 rounded-xl shadow-md text-muted-foreground border-2 border-primary space-y-4">
                    <p>{t("noupcomingEvents")}</p>
                    <Button asChild className="capitalize">
                        <Link href="/organizer/manage">{t("addEventBtn")}</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}
