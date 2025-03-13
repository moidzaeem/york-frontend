import Link from 'next/link'
import Card from "../card/Card";
import BirthDay from "./birthday";
import ArrowUpRight from '../icons/ArrowUpRight';

const BirthDays = ({ birth_days, see_all }) => {

    let currentBirthDayColors = "bg-[#1CA988] dark:bg-[#1CA988]";
    let futureBirthDayColors = "bg-[#E62F35] dark:bg-[#E62F35]";

    return (
        <Card className="h-full bg-white dark:bg-gray-800" >
            {/* Dashboard Stat header start */}
            <div className="w-full flex items-start justify-between gap-8">
                <div className="inline-flex items-center gap-2 text-black dark:text-gray-300 text-xl font-semibold">
                    <svg className="size-[23px] fill-none stroke-gray-700" viewBox="0 0 12 12">
                        <path d="M7.5 2V1M7.5 2V3M7.5 2H5.25M1.5 5V9.5C1.5 10.0523 1.94771 10.5 2.5 10.5H9.5C10.0523 10.5 10.5 10.0523 10.5 9.5V5H1.5Z" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1.5 5V3C1.5 2.44771 1.94771 2 2.5 2H3.5" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.5 1V3" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.5 5V3C10.5 2.44771 10.0523 2 9.5 2H9.25" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    Birthdays { birth_days?.total ?? 0 } 🎉 
                </div>

                <Link href={ see_all } className="fill-gray-400 hover:fill-blue-500 px-2 py-1" title="view all">
                    <ArrowUpRight />
                </Link>
            </div>
            {/* Dashboard Stat header end */}

            <div className="min-h-20 grid grid-cols-1 gap-4 mt-10">

                {
                    birth_days?.result?.length ? 
                        birth_days.result.map((birthDay, idx) => <BirthDay key={ idx } date={ birthDay.dob } name={ birthDay.name } fill_color={ birthDay.is_today ? currentBirthDayColors : futureBirthDayColors } />)
                        :
                        <div className="p-4 w-full bg-gray-100 min-h-32 flex items-center justify-center text-gray-800 text-base font-semibold rounded-md">
                            We don&apos;t have any birthdays this month
                        </div>
                }
                
            </div>
        </Card>
    );
}

export default BirthDays;