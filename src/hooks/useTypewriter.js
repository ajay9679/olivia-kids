
"use client";
import { useState, useEffect, useRef } from "react";



export default function useTypewriter(text, speed = 50, delay = 50){
    const [displayed, setDisplayed] = useState("");
    const timeoutRef = useRef();
    useEffect(() => {
        const safeText = typeof text === "string" ? text : "";
        setDisplayed("");
        let i = 0;
        function type(){
            if (i <= safeText.length) {
                setDisplayed(safeText.substring(0, i));
                i++;
                if (i <= safeText.length) {
                    timeoutRef.current = setTimeout(type, speed);
                }
            }
        }
        if (safeText) {
            timeoutRef.current = setTimeout(type, delay);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    },[text, speed, delay]);
    
    return displayed;
}
