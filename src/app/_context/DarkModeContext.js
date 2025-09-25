"use client";
import React from "react";


export const DarkModeContext = React.createContext();

export default function DarkModeProvider({children}){
    const [dark, setDark] = useState(false);
    
    React.useEffect(() => {
        if(typeof window !== "undefined") {
            const html = document.documentElement;
            if(dark){
                html.classList.add("dark");
            }else{
                html.classList.remove("dark");
            }
        }
    },[dark]);
    return <DarkModeContext.Provider value={{dark, setDark}}>
        {children}
    </DarkModeContext.Provider>
}