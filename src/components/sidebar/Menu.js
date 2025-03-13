'use client'

import { useState } from 'react';
import BaseButton from '../buttons/BaseButton';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';


const Menu = ({ menu, isFixed, setSidebar }) => {

  const [activeMenu, setActiveMenu] = useState(menu);
  const [previousMenus, setPreviousMenus] = useState([]);
  const router = useRouter();
  const currentPath = usePathname();


  const handleItemClick = (item) => {

    if (item.link) {

      router.push(item.link);

      if (isFixed) setSidebar(false);
    
    } 
    else if (item.children) {
    
        setPreviousMenus([...previousMenus, activeMenu]);
        setActiveMenu(item);

    }
  };

  const handleBackClick = () => {

    const lastMenu = previousMenus.pop();
    setActiveMenu(lastMenu);
    setPreviousMenus(previousMenus);
  };

  const arrowRight = <svg fill="currentColor" className="size-[23px]" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                    </svg>

  return (
        <div className='w-full flex flex-col gap-2'>
        {
            previousMenus.length ? (
                <BaseButton
                    className="bg-white border border-gray-500 p-2 rounded-full w-max px-5"
                    onClick={handleBackClick}>
                        <svg fill="currentColor" className="size-[23px]" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                        </svg>
                    Back
                </BaseButton>
            )
            : ""
        }

        {
            activeMenu?.children?.map((item) => {
                
                if (!item.show)
                    return "";

                return <div
                    key={ item.title }
                    onClick={() => handleItemClick(item)}
                    className={`group p-2 px-4 text-base font-medium truncate overflow-x-hidden transition duration-150 ease-in-out flex items-center justify-between rounded-3xl ${
                        currentPath == item.link
                            ? 'bg-[#EC2C2C] dark:bg-gray-700 text-slate-100 dark:text-slate-100 active-link'
                            : 'text-slate-800 dark:text-slate-300 hover:text-slate-100 focus:text-slate-100 dark:hover:text-slate-200 dark:focus:text-slate-200 hover:bg-[#EC2C2C] dark:hover:bg-gray-700 focus:bg-[#EC2C2C] dark:focus:bg-gray-700 hover:cursor-pointer'
                    }`}>

                    <div className="flex flex-1 items-center justify-start gap-2">

                        {
                            item.icon ? item.icon : arrowRight
                        }

                        <span>{ item.title }</span>
                    </div>
                </div>
            })
        }

        </div>
    );
};

export default Menu;
