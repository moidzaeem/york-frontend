import Link from 'next/link'
import Card from "../card/Card";
import Task from "./task";
import Signal from '../icons/Signal';
import ChevronRight from '../icons/ChevronRight';

const TodayTasks = ({ see_all, tasks = [] }) => {

    return (
        <Card className="h-full bg-white dark:bg-gray-800" >
            {/* Dashboard Stat header start */}
            <div className="w-full flex items-start justify-between gap-4 2xl:gap-8">
                <div className="inline-flex items-center gap-2 text-black dark:text-gray-300 text-xl font-semibold">
                    <Signal />
                    Today  Task  
                </div>

                <Link href={ see_all } className="fill-gray-400 hover:fill-blue-500 inline-flex items-center gap-2 text-gray-700 hover:text-blue-500 shadow-sm hover:shadow-md px-1 py-[2px]" title="view all">
                    See all
                    <ChevronRight />
                </Link>
            </div>
            {/* Dashboard Stat header end */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 2xl:gap-8 mt-10">

                {
                    tasks.length ? tasks.map(
                        (task, idx) => {

                            let progress_fill = "bg-green-500";
                            let progress_completed = "w-[0%]";
                            let progress_value = "0%";
                            let priorityClass = "";

                            if (task.status == "0%") {
                                progress_completed = "w-[0%]";
                                progress_value = "0%";
                            }
                            else if (task.status == "10%") {
                                progress_completed = "w-[10%]";
                                progress_value = "10%";
                            }
                            else if (task.status == "20%") {
                                progress_completed = "w-[20%]";
                                progress_value = "20%";
                            }
                            else if (task.status == "30%") {
                                progress_completed = "w-[30%]";
                                progress_value = "30%";
                            }
                            else if (task.status == "40%") {
                                progress_completed = "w-[40%]";
                                progress_value = "40%";
                            }
                            else if (task.status == "50%") {
                                progress_completed = "w-[50%]";
                                progress_value = "50%";
                            }
                            else if (task.status == "60%") {
                                progress_completed = "w-[60%]";
                                progress_value = "60%";
                            }
                            else if (task.status == "70%") {
                                progress_completed = "w-[70%]";
                                progress_value = "70%";
                            }
                            else if (task.status == "80%") {
                                progress_completed = "w-[80%]";
                                progress_value = "80%";
                            }
                            else if (task.status == "90%") {
                                progress_completed = "w-[90%]";
                                progress_value = "90%";
                            }
                            else if (task.status == "100%") {
                                progress_completed = "w-[100%]";
                                progress_value = "100%";
                            }

                            return <Task 
                                key={ idx }
                                title={ task.title }
                                time_left={ task.end_date }
                                short_description={ task.notes }
                                progress_completed={ progress_completed } 
                                progress_fill="bg-[#1CA988]" 
                                progress_value={ progress_value } />
                        }
                    )
                    : <div className="p-4 w-full bg-gray-100 min-h-32 flex items-center justify-center text-gray-800 text-base font-semibold rounded-md col-span-2">
                        You don&apos;t have any tasks for today
                    </div>
                }
            </div>
        </Card>
    );
}

export default TodayTasks;