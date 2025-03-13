import Card from "../card/Card";
import Image from "next/image";
import Cake from "../icons/Cake";

const BirthDay = ({ date, name, fill_color }) => {

    return (
        <Card className={`h-12 py-[1px] ${ fill_color } !rounded-full flex items-center`} >
            <div className="w-full flex items-center justify-between gap-4 2xl:gap-8">
                <div className="inline-flex items-center gap-2 2xl:gap-4 text-white font-normal text-base">
                    <span className="rounded-full w-max h-max p-2 inline-flex items-center justify-center">
                        <Cake />
                    </span>
                    { date }
                </div>
                <div className="font-normal text-white dark:text-gray-300 text-base capitalize">
                    { name }
                </div>
                
            </div>
        </Card>
    );
}

export default BirthDay;