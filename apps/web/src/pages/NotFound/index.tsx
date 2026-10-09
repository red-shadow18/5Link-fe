import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound=()=>{
    const navigate= useNavigate()
    const [seconds, setSeconds] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000)
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (seconds <= 0) {
            navigate("/");
        }
    }, [seconds]);
    return(
        <div>
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <p>Redirecting in {seconds} seconds...</p>
        </div>
    )
}

export default NotFound