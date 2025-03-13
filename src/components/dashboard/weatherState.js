
import Card from "../card/Card";
import Sun from "../icons/Sun";
import SunCloud from "../icons/SunCloud";

const WeatherStat = ({ city_name, temp, condition }) => {

    return (
        <Card className="h-auto bg-white dark:bg-gray-800" >

            {/* Dashboard Stat header start */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <div className="text-black dark:text-gray-300 text-xl font-semibold">
                    { city_name } 
                </div>
                <p className="text-sm font-nromal text-gray-700 dark:text-gray-500 uppercase">{ condition }</p>
            </div>
            {/* Dashboard Stat header end */}

            {/* Dashboard Stat Body start */}
            <div className="flex items-center justify-between gap-4 my-4">
                <span className="font-bold text-4xl text-blue-500 grow-0 shrink-0 w-max">{ temp }</span>
                {
                    temp > 18 ? <Sun /> : <SunCloud />
                }
            </div>
            {/* Dashboard Stat Body end */}
        </Card>
    );
}

export default WeatherStat;