'use client'

import Card from "@/components/card/Card";
import Plus from "@/components/icons/Plus";


import { useEffect, useState } from "react";
import JK_Calendar from "@/lib/calendar";
import UpdateEventModal from "@/components/modal/UpdateEventModal";
import axios from "@/lib/axios";
import BaseLink from "@/components/buttons/BaseLink";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccessControl } from "@/hooks/accessControl";
import './GoogleCalendar.css'; // Assuming you create a separate CSS file for styles

const GoogleCalendar = ({ calendarID }) => {
    const encodedCalendarID = encodeURIComponent(calendarID);
  
    return (
      <div className="calendar-wrapper">
        <h1>My Google Calendar</h1>
        <div className="iframe-container">
          <iframe
            src={`https://calendar.google.com/calendar/embed?src=${encodedCalendarID}&ctz=America%2FNew_York`}
            style={{ border: 0 }}
            width="800"
            height="600"
            frameBorder="0"
            title="Google Calendar"
          ></iframe>
        </div>
      </div>
    );
  };
  
  
  
  





const Page = () => {

    const date = new Date();
    const calendar = JK_Calendar({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        weekDayLabel: "full_name"
    });

    const monthsList = calendar.getMonths();
    const weekDaysLabel = calendar.getLabels();

    const [month, setMonth] = useState(calendar.getMonthNumber());
    const [days, setDays] = useState(calendar.getCalendar()['days']);


    const handleMonthPicker = async () => {
        setEvents([]);
        setMonth(prevValue => parseInt(event.target.value));
        calendar.setMonth(parseInt(event.target.value));
        setDays(prevDays => calendar.getCalendar()['days']);
        await loadEvents(parseInt(event.target.value));
    }


    // Event popup
    // const [isEventModalVisible, setIsEventModalVisible] = useState(false);
    const [isEventUpdateModalVisible, setIsEventUpdateModalVisible] = useState(false);
    const [eventID, setEventID] = useState(0);
    const [events, setEvents] = useState([]);
    const [googleCalanderId, setGoogleCalanderId] = useState('');
    const router = useRouter();
    const { permissions, can } = useAccessControl();

    if (!can(["Calendar", "Events - Create"])) {
        // navigate to 403 page.
        // router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    // const handEventPopup = () => {
    //     setIsEventModalVisible(true);
    // }

    // const closeEventModal = () => {
    //     setIsEventModalVisible(false);
    // };

    const handEventUpdatePopup = (eventID, event) => {
        if (event?.source === 'task' || event?.source === 'google') {
            // alert('sf');
            return;
        }
        setEventID(eventID);
        setIsEventUpdateModalVisible(true);
    }

    const closeEvenUpdatetModal = () => {
        setIsEventUpdateModalVisible(false);
    };

    const loadEvents = async (month) => {
        try {
            const response = await axios.get(`/api/events/calendar/${month}`);
            setEvents(response.data);
            setGoogleCalanderId(response.data?.calanderID)
            console.log(events);

        } catch (error) {
            // notify(error.data);

            // throw error;
        }
    }

    useEffect(() => {
        loadEvents(month);
    }, []);

    const breadcrumb = (
        <ul className="flex items-center justify-start gap-3">
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/dashboard">Dashboard</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Calendar
            </li>
        </ul>
    )


    return (
        <>
            <title>YORK - Calendar</title>

            <Card className="h-auto md:rounded-[15px] bg-transparent md:bg-white md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                {breadcrumb}

             { googleCalanderId &&  <GoogleCalendar calendarID={googleCalanderId} />}
                <div className="md:hidden grow flex flex-col gap-3 ">
                    <BaseLink href="/calendar/new" className="bg-white md:bg-[#f5f5f5] text-xl md:text-base" >
                        <Plus className="fill-slate-500" />
                        New Event
                    </BaseLink>

                    <select
                        name="calendar-month-picker"
                        value={month}
                        onChange={handleMonthPicker}
                        className="rounded-full py-2 px-4 grow w-full text-gray-950 dark:text-gray-400 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-normal focus:outline-none active:outline-none hover:border-[#1CA988]">
                        {
                            monthsList.length && monthsList.map(m => (
                                <option key={m.index} value={m.index}>{m.full_name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className={`bg-white dark:bg-gray-800 flex flex-col gap-3 items-start justify-start mt-5 md:mt-0 px-4 md:px-0 py-4 rounded-[15px] 2xl:rounded-[30px]`}>

                    {/* Card Header start */}
                    <div className="w-full flex items-start justify-between gap-8">

                        {/* Card Title start */}
                        <div className="inline-flex items-center gap-2 text-black dark:text-gray-300 text-xl">
                            <svg className="size-[18px] fill-none stroke-gray-400" viewBox="0 0 12 12">
                                <path d="M7.5 2V1M7.5 2V3M7.5 2H5.25M1.5 5V9.5C1.5 10.0523 1.94771 10.5 2.5 10.5H9.5C10.0523 10.5 10.5 10.0523 10.5 9.5V5H1.5Z" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1.5 5V3C1.5 2.44771 1.94771 2 2.5 2H3.5" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3.5 1V3" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.5 5V3C10.5 2.44771 10.0523 2 9.5 2H9.25" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            Calendar
                        </div>
                        {/* Card Title end */}

                        <div className="grow flex flex-col md:flex-row gap-3 md:items-center md:justify-end">
                            {/* Action Buttons start */}

                            {
                                can("Events - Create") ?
                                    <BaseLink href="/calendar/new" className="hidden md:flex bg-white md:bg-[#f5f5f5] text-base md:text-base" >
                                        <Plus className="fill-slate-500" />
                                        New Event
                                    </BaseLink>
                                    :
                                    ""
                            }

                            <select
                                name="calendar-month-picker"
                                value={month}
                                onChange={handleMonthPicker}
                                className="hidden md:inline-block rounded-full py-2 px-4 grow max-w-[200px] text-gray-950 dark:text-gray-400 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-normal focus:outline-none active:outline-none hover:border-[#1CA988]">
                                {
                                    monthsList.length && monthsList.map(m => (
                                        <option key={m.index} value={m.index}>{m.full_name}</option>
                                    ))
                                }
                            </select>
                            {/* Action Buttons end */}
                        </div>

                    </div>
                    {/* Card Header end */}

                    {/* Card Body start */}
                    <PerfectScrollbar className="w-full h-full">
                        <div className="w-full min-w-[768px] mb-4 mt-10">
                            <div className="grid grid-cols-7">
                                {
                                    weekDaysLabel.length && weekDaysLabel.map((day, idx) => (
                                        <span key={idx} className="text-center text-sm text-gray-700 dark:text-gray-300 border border-gray-300 py-8">{day}</span>
                                    ))
                                }
                            </div>

                            <div className="grid grid-cols-7">
                                {
                                    days.length && days.map((day, idx) => (
                                        <div
                                            key={idx}
                                            className={`
                                                border border-gray-300 h-full
                                                ${day.currentMonth ? 'bg-[#F5F5F5] dark:bg-gray-700 text-[#202224] dark:text-gray-400  hover:text-blue-600 hover:cursor-pointer' : ' bg-gray-200 text-gray-600 cursor-not-allowed'}
                                            `}
                                        >
                                            {
                                                events && day.currentMonth && Array.isArray(events[parseInt(day.day, 10)]) ? (
                                                    <div
                                                        className="w-full overflow-y-auto h-full text-center text-xs px-2 aspect-square rounded-full flex flex-col gap-3"
                                                    >
                                                        <span className="mt-2">{day.day}</span>

                                                        <div className="flex flex-col ">
                                                            {
                                                                events[parseInt(day.day, 10)].map((event, eventIdx) => {
                                                                    let bColor = "";

                                                                    // if (event.status == "Completed") {
                                                                    //     bColor = "border-green-500";
                                                                    // }
                                                                    // else if (event.status == "Pending") {
                                                                    //     bColor = "border-orange-500";
                                                                    // }
                                                                    // else if (event.status == "Canceled") {
                                                                    //     bColor = "border-red-500";
                                                                    // }
                                                                    // else if (event.status == "Postponed") {
                                                                    //     bColor = "border-blue-500";
                                                                    // }

                                                                    return <div
                                                                        key={eventIdx}
                                                                        className={`${bColor} rounded-md p-2`}
                                                                        onClick={
                                                                            day.currentMonth ? () => {
                                                                                handEventUpdatePopup(event.id, event);
                                                                            } : () => { console.log("here") }
                                                                        }
                                                                    >
                                                                        <div className="w-full text-xs font-semibold text-gray-900 mb-1  overflow-y-auto">
                                                                            {event.event_name} | {event.formated_date}
                                                                        </div>

                                                                    </div>
                                                                })
                                                            }
                                                        </div>

                                                    </div>
                                                )
                                                    :
                                                    <div
                                                        className="w-full h-full text-center text-base py-8  flex items-center justify-center"
                                                    >
                                                        {day.day}
                                                    </div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </PerfectScrollbar>
                    {/* Card Body end */}

                </div>
            </Card>



            {/* <CreateEventModal 
                isVisible={isEventModalVisible} 
                onClose={closeEventModal} /> */}


            {
                eventID && isEventUpdateModalVisible ?
                    <UpdateEventModal
                        isVisible={isEventUpdateModalVisible}
                        eventID={eventID}
                        onClose={closeEvenUpdatetModal}
                    />
                    :
                    ""
            }
        </>
    )
}

export default Page;