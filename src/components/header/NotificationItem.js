import Link from 'next/link'
import Card from "../card/Card";
import ArrowUpRight from '../icons/ArrowUpRight';
import Bell from '../icons/Bell';

const NotificationItem = ({ notification, link = "" }) => {

    return (
        <Card className="h-10 py-1 bg-[#1CA988] dark:bg-[#1CA988] !rounded-full flex items-center" >
            <div className="w-full flex items-center justify-between">
                <div className="inline-flex items-center text-white dark:text-white font-normal text-base">
                    { notification }
                </div>
                
                {/* <Link 
                    href={link}
                    title="View notification" 
                    className="rounded-full w-max h-max p-2 bg-white dark:bg-gray-900 inline-flex items-center justify-center fill-gray-400 hover:fill-blue-500">
                    
                    <ArrowUpRight />
                </Link> */}
            </div>
        </Card>
    );
}

export default NotificationItem;