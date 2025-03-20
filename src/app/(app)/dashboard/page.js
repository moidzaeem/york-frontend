'use client'

import Stat from '@/components/dashboard/stat'
import WeatherStat from '@/components/dashboard/weatherState'
import PendingTasksBar from '@/components/dashboard/pendingTasksBar'
import TodayTasks from '@/components/dashboard/todayTasks'
import BirthDays from '@/components/dashboard/birthdays'
import Calendar from '@/components/dashboard/calendar'
import Sun from '@/components/icons/Sun'
import SunCloud from '@/components/icons/SunCloud'
import { useFetchDropdownData } from '@/hooks/fetchDropdownData'
import axios from '@/lib/axios'
import GoogleConnectButton from '@/components/GoogleConnect'
import { useContext } from 'react';
import AuthContext from '@/lib/authContext';

// export const metadata = {
//     title: 'XFUSE - Dashboard',
// }

const Dashboard = () => {

    const { dropdowns: stats, setDropdowns: setStats } = useFetchDropdownData("/api/dashboard");
    let user = useContext(AuthContext);

    const loadDashboardData = async (month) => {

        try {
            const response = await axios.get("/api/dashboard", {
                params: { month }
            });

            setStats(prev => {
                return {
                    ...response.data
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    const containerStyle = {
        marginTop: '20px', // Add top margin to space out the button
        display: 'flex',   // Use flexbox to center the content
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically if you want it in a container with more height
    };


    return (
        <>
            <title>YORK - Dashboard</title>


            <div className="grid grid-cols-12 gap-4 2xl:gap-8">
                <div className="w-full col-span-12 lg:col-span-8 bg-transparent">
                    {!user?.google_access_token && (
                        <div style={containerStyle}>
                            <GoogleConnectButton />
                        </div>
                    )}

                    <div className="mt-3 w-full h-auto grid grid-cols-1 lg:grid-cols-3 gap-4 2xl:gap-8 mb-4 2xl:mb-8">
                        <Stat title="Tasks 📋" shortDescription="total number of tasks" count={stats?.total_tasks ?? 0} path="/tasks" />
                        <Stat title="Clients 🤝" shortDescription="total number of clients" count={stats?.total_clients ?? 0} path="/projects/clients" />
                        <Stat title="Tender 🎯" shortDescription="total number of tenders" count={stats?.total_tenders ?? 0} path="/tenders" />
                    </div>

                    <div className="w-full h-auto grid grid-cols-1 gap-4 2xl:gap-8 my-4 2xl:my-8">
                        {/* Dashboard Pending Tasks Bar start */}
                        <PendingTasksBar />
                        {/* Dashboard Pending Tasks Bar end */}
                    </div>

                    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 2xl:gap-8 my-4 2xl:my-8">

                        {
                            stats?.weather?.brantford && <WeatherStat city_name={stats.weather.brantford.title} condition={stats.weather.brantford.label} temp={stats.weather.brantford.temp} />
                        }

                        {
                            stats?.weather?.north_york && <WeatherStat city_name={stats.weather.north_york.title} condition={stats.weather.north_york.label} temp={stats.weather.north_york.temp} />
                        }

                    </div>

                    <div className="w-full h-auto mt-4 2xl:mt-8">

                        <TodayTasks see_all="/tasks" tasks={stats?.today_tasks} />

                    </div>
                </div>

                <div className="w-full col-span-12 lg:col-span-4 bg-transparent justify-self-stretch">
                    <div className="w-full h-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 2xl:gap-8">

                        <Calendar reloadDashboardData={loadDashboardData} />

                        <BirthDays birth_days={stats?.birthdays} see_all="#" />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard











{/* <div className="grid grid-cols-12 gap-4">
<div className="col-span-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <Card className="h-40 bg-gray-100 dark:bg-gray-800" />
    <Card className="h-40 bg-gray-100 dark:bg-gray-800" />
    <Card className="h-40 bg-gray-100 dark:bg-gray-800" />
    <Card className="col-span-3 h-10 bg-gray-100 dark:bg-gray-800" />
    <div className="col-span-8 grid grid-cols-12 gap-4">
        <Card className="col-span-6 h-40 bg-gray-100 dark:bg-gray-800" />
        <Card className="col-span-6 h-40 bg-gray-100 dark:bg-gray-800" />
    </div>
</div>
<div className="col-span-4 grid grid-cols-1 grid-rows-3 gap-4">
    <Card className="h-80 bg-gray-100 dark:bg-gray-800" />
    <Card className="h-60 bg-gray-100 dark:bg-gray-800" />
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
<Card className="h-40 bg-gray-100 dark:bg-gray-800" />
<Card className="h-40 bg-gray-100 dark:bg-gray-800" />
<Card className="h-40 bg-gray-100 dark:bg-gray-800" />
<Card className="h-40 bg-gray-100 dark:bg-gray-800" />
</div>
<div className="grid lg:grid-cols-6 gap-4 mt-4">
<Card className="w-full h-28 lg:h-full bg-gray-100 dark:bg-gray-800 lg:row-span-2 lg:col-span-4" >
    <div className="border-l border-b border-gray-600 h-full w-full p-4 flex items-end gap-2 ">
        <div className="w-4 rounded-tl-md rounded-tr-md h-full bg-red-600"></div>
        <div className="w-4 rounded-tl-md rounded-tr-md h-48 bg-cyan-700"></div>
        <div className="w-4 rounded-tl-md rounded-tr-md h-64 bg-cyan-700"></div>
        <div className="w-4 rounded-tl-md rounded-tr-md h-32 bg-yellow-600"></div>
        <div className="w-4 rounded-tl-md rounded-tr-md h-80 bg-cyan-700"></div>
        <div className="w-4 rounded-tl-md rounded-tr-md h-48 bg-cyan-700"></div>
        <div className="w-4 rounded-tl-md rounded-tr-md h-64 bg-green-600"></div>
        <div className="w-4 rounded-tl-md rounded-tr-md h-32 bg-cyan-700"></div>
    </div>
</Card>
<Card className="w-full min-h-60 bg-gray-100 dark:bg-gray-800 lg:col-span-2" />
<Card className="w-full min-h-96 bg-gray-100 dark:bg-gray-800 lg:col-span-2" >
    <Example />
    <CustomTabs />
</Card>
</div>
<div className="grid grid-cols-1 gap-4 mt-4">
<Card className="min-h-96 bg-gray-100 dark:bg-gray-800">

    <ManagedAccounts />
</Card>
</div> */}