import { Button } from "@mui/material";
import { useEffect, useState } from "react";


const TimerButtonComponent = ({ config, field }) => {
    // Initialize state hooks
    const [timer, setTimer] = useState(30);
    const [disabled, setDisabled] = useState(true);

    // useEffect to handle timer countdown
    useEffect(() => {
        let interval = null;

        if (timer > 0 && disabled) {
            interval = setInterval(() => {
                setTimer((t) => t - 1);
            }, 1000);
        } else if (timer <= 0 && disabled) {
            setDisabled(false);
            clearInterval(interval);
        }

        // Cleanup interval when the component unmounts or dependencies change
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [timer, disabled]);

    // Button click handler to reset timer and disable state
    const handleButtonClick = () => {
        setDisabled(true);
        setTimer(60);
        if (field?.action) field.action();
    };

    return (
        <Button
            className={`${field?.class}`}
            fullWidth
            type={config?.type}
            variant="contained"
            disabled={disabled}
            onClick={handleButtonClick}
        >
            {disabled ? `Resend in ${timer} seconds` : config?.label}
        </Button>
    );
};

export default TimerButtonComponent;