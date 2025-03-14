import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { globalStore } from "../services/store/global.store";

const Dashboard = () => {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(0);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        // Redirect to the login page
        navigate("/login");
    }

    useEffect(() => {
        if(counter <= 1) {
            globalStore?.storeDetails?.subscribe(response => {
                setCounter(response?.counter);
            })
        }
    }, [counter]);

    return <>
        <h1>Welcome to the Dashboard (Protected {counter})</h1>
        <Button color="danger" onPress={handleLogout}>Logout</Button>
    </>;
};

export default Dashboard;