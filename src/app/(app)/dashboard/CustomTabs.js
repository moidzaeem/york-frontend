'use client';

import JkTabs, { JkTab } from '@/components/tabs/JkTabs';
import { useState } from 'react';

const CustomTabs = () => {

    const [activeTab, setActiveTab] = useState(1);

    const myTabs = [
        { id: 1, label: "Tomato" },
        { id: 2, label: "Lettuce" },
        { id: 3, label: "Cheese" }
    ];

    return (
        <JkTabs>
                <JkTab 
                    active={ activeTab === myTabs[0].id } 
                    label={ myTabs[0].label } 
                    switchTab={ () => setActiveTab(myTabs[0].id) } 
                    tabGroupId="custom-1" 
                    tabKey={ myTabs[0].id } 
                    key={ myTabs[0].id }
                >
                    <div className="">
                        <h2>Tab 1 heading</h2>
                        <p>Tab 1 paragraph. Tab 1 paragraph. Tab 1 paragraph. Tab 1 paragraph. Tab 1 paragraph. Tab 1 paragraph. Tab 1 paragraph. Tab 1 paragraph.</p>
                    </div>
                </JkTab>
                
                <JkTab 
                    active={ activeTab === myTabs[1].id } 
                    label={ myTabs[1].label } 
                    switchTab={ () => setActiveTab(myTabs[1].id) } 
                    tabGroupId="custom-1" 
                    tabKey={ myTabs[1].id } 
                    key={ myTabs[1].id }
                >
                    <div className="">
                        <h2>Tab 2 heading</h2>
                        <p>Tab 2 paragraph. Tab 2 paragraph. Tab 2 paragraph. Tab 2 paragraph. Tab 2 paragraph. Tab 2 paragraph. Tab 2 paragraph. Tab 2 paragraph.</p>
                    </div>
                </JkTab>
                
                <JkTab 
                    active={ activeTab === myTabs[2].id } 
                    label={ myTabs[2].label } 
                    switchTab={ () => setActiveTab(myTabs[2].id) } 
                    tabGroupId="custom-1" 
                    tabKey={ myTabs[2].id } 
                    key={ myTabs[2].id }
                >
                    <div className="">
                        <h2>Tab 3 heading</h2>
                        <p>Tab 3 paragraph. Tab 3 paragraph. Tab 3 paragraph. Tab 3 paragraph. Tab 3 paragraph. Tab 3 paragraph. Tab 3 paragraph. Tab 3 paragraph.</p>
                    </div>
                </JkTab>
        </JkTabs>
    )
}

export default CustomTabs