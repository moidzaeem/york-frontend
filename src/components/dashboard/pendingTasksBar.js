import Link from 'next/link'
import Card from "../card/Card";
import ArrowUpRight from '../icons/ArrowUpRight';
import Bell from '../icons/Bell';

const PendingTasksBar = () => {

    return (
        <Card className="min-h-12 py-[1px] bg-[#1CA988] dark:bg-[#1CA988] !rounded-full flex items-center" >
            <div className="w-full flex items-center justify-between gap-8">
                <div className="inline-flex items-center gap-4 text-white dark:text-white font-semibold text-lg">
                    <span className="rounded-full w-max h-max p-2 bg-white dark:bg-gray-900 inline-flex items-center justify-center">
                        <Bell />
                    </span>
                    You have new pending tasks. Good luck 🚀
                </div>
                
                <Link 
                    href="/tasks"
                    title="View all pending tasks" 
                    className="rounded-full w-max h-max p-2 bg-white dark:bg-gray-900 inline-flex items-center justify-center fill-gray-400 hover:fill-blue-500">
                    
                    <ArrowUpRight />
                </Link>
            </div>
        </Card>
    );
}

export default PendingTasksBar;