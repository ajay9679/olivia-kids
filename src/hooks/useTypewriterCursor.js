import { useState, useEffect, useRef } from "react";

export default function useTypewriter(text, speed = 50, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef();
  useEffect(() => {
    const safeText = typeof text === "string" ? text : "";
    setDisplayed("");
    setIsTyping(true);
    let i = 0;
    function type() {
      if (i <= safeText.length) {
        setDisplayed(safeText.substring(0, i));
        i++;
        if (i <= safeText.length) {
          timeoutRef.current = setTimeout(type, speed);
        } else {
          setIsTyping(false);
        }
      }
    }
    if (safeText) {
      timeoutRef.current = setTimeout(type, delay);
    } else {
      setIsTyping(false);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, delay]);
  return [displayed, isTyping];
}
