'use client'

import Card from '@/components/card/Card'
import Container from '@/components/container/Container'
import PageContentHeader from '@/components/partials/PageContentHeader'
// import ManagedAccounts from './ManagedAccountsTable'
import JkTabs from '@/components/tabs/JkTabs'
import CustomTabs from './CustomTabs'
import Example from '@/components/dialog/Example'

// export const metadata = {
//     title: 'XFUSE - Dashboard',
// }

const Dashboard = () => {

    return (
        <>
            <title>YORK - Dashboard</title>
            

            {/* <PageContentHeader background="bg-blue-600" title="Dashboard">
            </PageContentHeader> */}

            <div className="my-4">
                <div className="grid grid-cols-12 gap-4">
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
                        {/* <JkTabs uniqueId="tab1" /> */}
                        <Example />
                        {/* <CustomTabs /> */}
                    </Card>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4">
                    <Card className="min-h-96 bg-gray-100 dark:bg-gray-800">
                        {/* <ManagedAccountsTable /> */}

                        {/* <ManagedAccounts /> */}
                    </Card>
                </div>
            </div>

        </>
    )
}

export default Dashboard