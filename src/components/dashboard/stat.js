import Link from 'next/link'
import Card from "../card/Card";
import ArrowUpRight from '../icons/ArrowUpRight';

const Stat = ({ title, count, shortDescription, path = "/dashboard" }) => {

    return (
        <Card className="h-auto bg-white dark:bg-gray-800" >

            {/* Dashboard Stat header start */}
            <div className="w-full flex items-start justify-between gap-4 2xl:gap-8">
                <div className="text-black dark:text-gray-300 text-xl font-semibold">
                    { title } 
                </div>
                
                <Link href={path} className="fill-gray-400 hover:fill-blue-500 px-2 py-1" title="view all">
                    <ArrowUpRight />
                </Link>
            </div>
            {/* Dashboard Stat header end */}

            {/* Dashboard Stat Body start */}
            <div className="flex items-center justify-start gap-4 my-4">
                <span className="font-bold text-4xl text-blue-500 grow-0 shrink-0 w-max">{ count }</span>
                <p className="text-base font-semibold text-gray-950 dark:text-gray-400 capitalize mt-4">{ shortDescription }</p>
            </div>
            {/* Dashboard Stat Body end */}
        </Card>
    );
}

export default Stat;