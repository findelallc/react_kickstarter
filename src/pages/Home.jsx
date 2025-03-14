import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { globalStore } from "../services/store/global.store";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (globalStore?.storeDetails?.value?.counter <= 0) {
            globalStore.updateStore({ counter: 1 });
        }
    }, [navigate]);

    return <>
        <h1>Welcome to the Home Page</h1>
        <Link to="/login">Go to Login</Link>
    </>;
};

export default Home;