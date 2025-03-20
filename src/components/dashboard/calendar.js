import Card from "../card/Card";
import { useState } from "react";
import JK_Calendar from "@/lib/calendar";
import Link from 'next/link'

const Calendar = ({ reloadDashboardData }) => {

    const date = new Date();
    const calendar = JK_Calendar({
        year: date.getFullYear(),
        month: date.getMonth() + 1
    });

    const monthsList = calendar.getMonths();
    const weekDaysLabel = calendar.getLabels();

    const [month, setMonth] = useState(calendar.getMonthNumber());
    const [days, setDays] = useState(calendar.getCalendar()['days']);


    const handleMonthPicker = () => {
        setMonth(prevValue => parseInt(event.target.value));
        calendar.setMonth(parseInt(event.target.value));
        setDays(prevDays => calendar.getCalendar()['days']);

        reloadDashboardData(parseInt(event.target.value));
    }

    return (
        <Card className="h-max bg-white dark:bg-gray-800" >
            {/* Dashboard Stat header start */}
            <div className="w-full flex items-start justify-between gap-8">
                <div className="inline-flex items-center gap-2 text-black dark:text-gray-300 text-xl font-semibold">
                    <svg className="size-[23px] fill-none stroke-gray-800" viewBox="0 0 12 12">
                        <path d="M7.5 2V1M7.5 2V3M7.5 2H5.25M1.5 5V9.5C1.5 10.0523 1.94771 10.5 2.5 10.5H9.5C10.0523 10.5 10.5 10.0523 10.5 9.5V5H1.5Z" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1.5 5V3C1.5 2.44771 1.94771 2 2.5 2H3.5" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.5 1V3" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.5 5V3C10.5 2.44771 10.0523 2 9.5 2H9.25" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    Calendar
                </div>
                
                <select
                    name="calendar-month-picker"
                    value={ month } 
                    onChange={ handleMonthPicker }
                    className="rounded-full py-2 px-4 grow max-w-[200px] text-gray-950 dark:text-gray-400 dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-sm font-normal focus:outline-none active:outline-none hover:border-[#1CA988]">
                    {
                        monthsList.length && monthsList.map(m => (
                            <option key={m.index} value={m.index}>{m.full_name}</option>
                        ))
                    }
                </select>
            </div>
            {/* Dashboard Stat header end */}

            <div className="w-full mb-4 mt-10">
                <div className="grid grid-cols-7 gap-3">
                    {
                        weekDaysLabel.length && weekDaysLabel.map((day, idx) => (
                            <span key={idx} className="text-center text-base font-semibold text-gray-800 dark:text-gray-400">{ day }</span>
                        ))
                    }
                </div>

                <div className="grid grid-cols-7 gap-3 mt-4">
                    {
                        days.length && days.map((day, idx) => (
                            <Link  key={idx} href="/calendar">
                            <span className="flex items-center justify-center">
                                <span 
                                    className={`
                                        text-center text-sm font-semibold w-9 p-2 px-4 aspect-square rounded-full flex items-center justify-center
                                        ${ day.currentMonth ? 'bg-[#F5F5F5] dark:bg-gray-700 text-[#202224] dark:text-gray-400 hover:bg-[#1CA988] hover:text-white hover:cursor-pointer' : ' bg-[#FE642B] text-white' }
                                        ${ (day.currentMonth && day.currentDate) ? '!bg-[#1CA988] !text-white' : '' }
                                    `}>
                                    { day.day }
                                </span>
                            </span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </Card>
    );
}

export default Calendar;