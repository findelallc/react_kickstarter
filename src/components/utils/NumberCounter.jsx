import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const NumberCounter = ({ start = 0, end, duration = 1000 }) => {
    const [value, setValue] = useState(start);

    useEffect(() => {
        const range = end - start;
        const increment = range / (duration / 16.67);
        let current = start;

        const interval = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                clearInterval(interval);
                current = end;
            }
            setValue(Math.round(current));
        }, 16.67);

        return () => clearInterval(interval);
    }, [start, end, duration]);

    return <>{value}</>;
};

NumberCounter.propTypes = {
    start: PropTypes.node,
    end: PropTypes.node.isRequired,
    duration: PropTypes.node
};