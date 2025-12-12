'use client'
import { EventProps } from '@/types/EventTypes'
import React, { useState } from 'react'
import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import TicketCard from './TicketCard'

export default function BrowseEvents({ events }: EventProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // 2. Event handler for input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  // 3. Filtering Logic
  const filteredEvents = events.filter((event) => {
    const query = searchQuery.toLowerCase()
    return (
      // Check if event name includes the query
      event.name.toLowerCase().includes(query) ||
      // Check if event description (assuming it exists) includes the query
      (event.description && event.description.toLowerCase().includes(query))
    )
  })
  return (
    <section className="min-h-screen py-8 w-[85%] mx-auto flex flex-col gap-6">
      <h1 className="capitalize font-bold text-4xl  text-foreground">
        Browse All events
      </h1>
      <div className='w-full flex justify-end'>
      <ButtonGroup >
          <Input placeholder="Search..." value={searchQuery}
            onChange={handleSearchChange} />
        <Button variant="outline" aria-label="Search">
          <SearchIcon />
        </Button>
      </ButtonGroup>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        {
          // 5. Render filteredEvents
          filteredEvents.map((event) => (
            <TicketCard key={event._id} event={event} />
          ))
        }
        {filteredEvents.length === 0 && (
          <p className="col-span-3 text-center text-xl text-muted-foreground">
            No events found matching your search.
          </p>
        )}
      </div>
    </section>
  )
}
