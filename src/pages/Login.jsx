import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { globalStore } from "../services/store/global.store";
import { loginUser } from "../services/api/auth.api";
import { Form, Input, Button } from "@nextui-org/react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (globalStore?.storeDetails?.value?.counter <= 1) {
            globalStore.updateStore({ counter: 2 });
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Reset the error message on each attempt
        try {
            // Call the login service
            const response = await loginUser(email, password);
            if (response.status === 200) {
                localStorage.setItem("authToken", "dummyToken");
                // navigate("/dashboard"); // Redirect to dashboard
                setSubmitted(response.data);
            }
        } catch (error) {
            setError("Invalid credentials. Please try again.");
            console.error("Login failed", error);
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <Link to="/">Back to home</Link>
            <Button color="primary" onPress={handleLogin}>Login</Button>
            <Form className="w-full max-w-xs" validationBehavior="native" onSubmit={handleLogin}>
                <Input
                    isRequired
                    errorMessage="Please enter a valid email"
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    isRequired
                    errorMessage="Please enter a valid password"
                    label="Password"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="bordered">
                    Submit
                </Button>
                {submitted && (
                    <div className="text-small text-default-500">
                        You submitted: <code>{JSON.stringify(submitted)}</code>
                    </div>
                )}
            </Form>
        </div>
    );
};

export default Login;