import { Button, Card, CardBody } from "@heroui/react";
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
        if (counter <= 1) {
            globalStore?.storeDetails?.subscribe(response => {
                setCounter(response?.counter);
            })
        }
    }, [counter]);

    return <>
        {
            Array(10).fill().map((item, index) =>
                <Card key={index} shadow="sm" radius="sm" className="mb-4">
                    <CardBody>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardBody>
                </Card>
            )
        }

    </>;
};

export default Dashboard;