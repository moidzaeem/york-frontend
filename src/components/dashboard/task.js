import Card from "../card/Card";

const Task = ({ title, time_left, short_description, progress_completed, progress_fill, progress_value }) => {

    return (
        <Card className="bg-[#f5f5f5] dark:bg-gray-900" >
            {/* Task Header start */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <div className="text-black dark:text-gray-300 text-xl font-semibold">
                    { title }
                </div>
                <p className="text-base font-semibold text-gray-700">
                    { short_description }
                </p>
            </div>
            {/* Task Header end */}

            {/* Task Progress start */}
            <div className="flex flex-col items-start gap-2 mt-5">
                <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className={`${progress_completed} h-full rounded-full ${progress_fill}`}></div>
                </div>
                <div className="w-full flex items-start justify-between gap-2 text-lg text-black dark:text-gray-300 capitalize">
                    <span>Progress</span>
                    <span>{ progress_value }</span>
                </div>
            </div>
            {/* Task Progress end */}

            <div className="w-full h-[1px] border-t-2 border-gray-200 dark:border-gray-700 my-4"></div>

            {/* Task Deadline start */}
            <div className="flex items-center justify-end">
                <span className="w-max px-4 py-1 bg-white dark:bg-gray-800 text-gray-700 text-base rounded-full">Deadline: { time_left }</span>
            </div>
            {/* Task Deadline end */}
        </Card>
    );
}

export default Task;