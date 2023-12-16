import React, { createContext, useState, useEffect } from 'react'

const AllContext = createContext()

const AllProvider = ({ children }) => {
    const [member, setMember] = useState({ name: '', email: '' })
    //check now time
    const [nowtime, setNowTime] = useState('')
    // clock
    useEffect(() => {
        const updateTime = () => {
            const Time = new Date()
            setNowTime(Time)
        };
        updateTime()
        const intervalId = setInterval(updateTime, 60000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <AllContext.Provider value={{ member, setMember, nowtime, setNowTime }}>
            {children}
        </AllContext.Provider>
    )
}

export { AllProvider, AllContext }