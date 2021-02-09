import { useState, useEffect } from "react";

export const useNetworkStatus = () => {
  const [online, setOnline] = useState<boolean | undefined>();
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if(navigator.onLine !== true || navigator.onLine === undefined){
      setOnline(false);
      setStatus("Offline");
    }
    const handleEvent = () => {
      if (navigator.onLine) {
        setOnline(true);
        setStatus("online");
      } else {
        setOnline(false);
        setStatus("offline");
      }
    };

    window.addEventListener("online", handleEvent);
    window.addEventListener("offline", handleEvent);

    // cleanup
    return () => {
      window.removeEventListener("online", handleEvent);
      window.removeEventListener("offline", handleEvent);
    };
  }, [online]);
  return [online, status, setOnline] as const;
};