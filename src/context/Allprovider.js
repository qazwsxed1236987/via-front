import React, { createContext, useState, useEffect } from 'react';

// 創建上下文
const AllContext = createContext();

// 創建提供者組件
const AllProvider = ({ children }) => {
    //會員
    const [member, setMember] = useState({ name: '', email: '' });
    //計算寄信時間用
    const [nowtime, setNowTime] = useState('');


    // 好的 先不管
    useEffect(() => {
        // 定義一個函數，用於設定現在時間到 nowtime 狀態
        const updateTime = () => {
            const Time = new Date();
            setNowTime(Time);
        };

        // 初始化時執行一次，然後每一分鐘執行一次 updateNowTime 函數
        updateTime(); // 初始設定一次
        const intervalId = setInterval(updateTime, 60000); // 60000 毫秒 = 1 分鐘

        // 清理函數，用於在組件卸載時停止 setInterval
        return () => clearInterval(intervalId);
    }, []);




    return (
        <AllContext.Provider value={{ member, setMember, nowtime, setNowTime }}>
            {children}
        </AllContext.Provider>
    );
};

export { AllProvider, AllContext };