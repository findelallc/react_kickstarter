import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { globalStore } from "../store";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
            navigate("/dashboard"); // Redirect to dashboard if authenticated
        }

        if (globalStore?.storeDetails?.value?.counter <= 1) {
            globalStore.updateStore({ counter: 2 });
        }

    }, [navigate]);

    const handleLogin = () => {
        localStorage.setItem("authToken", "sample_token");
        navigate("/dashboard");
    };

    return (
        <div>
            <h1>Login Page</h1>
            <Link to="/">Back to home</Link>
            <Button color="primary" onPress={handleLogin}>Login</Button>
        </div>
    );
};

export default Login;