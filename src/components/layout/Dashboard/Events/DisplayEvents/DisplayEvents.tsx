import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { PiTicketFill } from "react-icons/pi";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { EventProps, ISubEvent } from "@/types/EventTypes";

const formatTime = (time: string): string => {
  try {
    // Assuming time is in "HH:MM" format (24-hour)
    const [hours, minutes] = time.split(":");
    const date = new Date(0, 0, 0, parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch (e) {
    return time; // Return original if formatting fails
  }
};
// Function to format the date
const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    return dateString;
  }
};
export default function DisplayEvents({ events }: EventProps) {
  console.log(events);

  const t = useTranslations("Dashboard.displayEvents");
  return (
    <div className="min-h-screen py-8 w-[85%] mx-auto flex flex-col  gap-6">
      <h1 className="capitalize font-bold text-4xl  text-foreground">
        {t("title")}
      </h1>
      {events.map((event) => (
        // <div key={event._id} className=" w-full bg-white rounded-xl shadow-lg border border-indigo-200/50 p-4 sm:p-6 transition-all duration-300">
        //     <div className="grid grid-cols-6 justify-center items-center   gap-4 sm:gap-6">
        //         <div className="shrink-0 col-span-1   overflow-hidden rounded-lg">
        //             <Image
        //                 src={event?.avatar || '/events/defaultImgEvent.png'}
        //                 alt="Crowd gathered at a music festival stage at sunset"
        //                 className="w-full h-full object-cover transition duration-500 ease-in-out hover:scale-105"
        //                 width={100}
        //                 height={100}
        //             />
        //         </div>
        //         <div className=" col-span-2 space-y-3 pt-1">
        //             <h2 className="text-lg font-bold text-gray-900 leading-tight">{event.name}</h2>
        //             <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-md text-gray-600">
        //                 <div className="flex items-center">
        //                     <FaLocationDot className="w-4 mr-2 items-baseline text-red-600" />
        //                     <span>{event.locate}</span>
        //                 </div>
        //                 <div className="flex items-center">
        //                     <FaCalendar className="w-4 mr-2 items-baseline text-green-600" />
        //                     <span>{formatDate(event.eventDate)}</span>
        //                 </div>
        //             </div>
        //             <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-md text-gray-600">
        //                 <div className="flex items-center">
        //                     <MdAccessTime className="w-4 mr-2 items-baseline text-blue-600" />
        //                     <span>{formatTime(event.startTime)} – {formatTime(event.endTime)}</span>
        //                 </div>
        //                 <div className="flex items-center">
        //                     <BsFillPeopleFill className="w-4 mr-2 items-baseline text-gray-600" />
        //                     <span>{event.capacity} attendees</span>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="shrink-0 flex flex-col col-span-2 items-start sm:items-end space-y-4 pt-1">
        //             <div className="flex items-center space-x-3 w-full sm:w-auto">
        //                 <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center ticket-icon-bg shadow-md">
        //                     <PiTicketFill className="w-5 h-5" />
        //                 </div>
        //                 <div className="text-right grow">
        //                     <p className="text-lg font-semibold text-gray-900 leading-none">{event.capacity - 10}</p>
        //                     <p className="text-xs text-gray-500 mt-0.5">{t('ticketLeft')}</p>
        //                 </div>
        //             </div>
        //             <div className="w-full sm:w-48">
        //                 <div className="w-full bg-gray-200 rounded-full h-2.5">

        //                     <div className="bg-indigo-500 h-2.5 rounded-full w-[80%]" ></div>
        //                 </div>
        //                 <p className="text-xs font-medium text-yellow-600 mt-1">{t('sold', { percent: 80 })}</p>
        //             </div>

        //         </div>
        //         <button
        //             className="w-full h-fit col-span-1 sm:w-auto px-6 py-2.5 rounded-lg bg-indigo-200 text-indigo-800 font-bold text-lg hover:bg-indigo-300 transition-colors duration-200 shadow-md">
        //             {event.ticketPrice}
        //         </button>
        //     </div>
        // </div>
        <div
          key={event._id}
          className=" my-4 border-2 border-primary shadow-xl rounded-xl overflow-hidden transform hover:scale-[1.01] transition duration-300"
        >
          <div className="p-6 sm:p-8">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4 border-b pb-4">
              <div>
                <h2 className="text-3xl font-extrabold ">
                  {event.name}
                </h2>
                <p className="text-sm font-medium text-indigo-600 uppercase tracking-wider">
                  {event.type}
                </p>
              </div>
              {/* Avatar/Image placeholder */}
              
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500 overflow-hidden">
                    <Image
                        src={event.avatar || '/events/defaultImgEvent.png'}
                      alt={`${event.name} avatar`}
                      className="w-full h-full object-cover"
                      width={150}
                      height={100}
                    />
                  
                </div>
             
            </div>

            {/* Date, Time, and Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="font-semibold">{formatDate(event.eventDate)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p>
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <p>{event.locate}</p>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Details
                </h3>
                <p className="text-gray-700">{event.description}</p>
              </div>
            )}

            {/* Pricing and Capacity */}
            <div className="grid grid-cols-3 gap-4 mb-6 pt-4 border-t">
              <div>
                <p className="text-sm font-medium text-gray-500">Ticket Type</p>
                <p
                  className={`text-lg font-bold ${
                    event.ticketPrice === 0
                      ? "text-gray-800"
                      : "text-foreground"
                  }`}
                >
                  {event.ticketPrice === 0 ? "Free" : "Priced"}
                </p>
              </div>
              {event.ticketPrice !== 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Price</p>
                  <p className="text-lg font-bold">
                    ${event.ticketPrice.toFixed(2)}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-500">Capacity</p>
                <p className="text-lg font-bold ">
                  {event.capacity} people
                </p>
              </div>
            </div>

            {/* Sub-Events/Sections */}
            {event.sections && event.sections.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 border-t pt-4">
                  Schedule
                </h3>
                <div className="space-y-4">
                  {event?.sections?.map((section: ISubEvent, index: number) => (
                    <div
                      key={index}
                      className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50/50"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-800">
                          {section.title}
                        </h4>
                        <p className="text-xs text-gray-500 font-medium">
                          {formatTime(section.startTime)} -{" "}
                          {formatTime(section.endTime)}
                        </p>
                      </div>
                      {section.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {section.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4 border-t">
              <button
                // onClick={() => onEdit(event)}
                className="flex-1 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-150"
              >
                ✏️ Edit Event
              </button>
              <button
                // onClick={() => onDelete(_id)}
                className="flex-1 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150"
              >
                🗑️ Delete Event
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
