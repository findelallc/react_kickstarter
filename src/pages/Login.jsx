import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { globalStore } from "../services/store/global.store";
import { loginUser } from "../services/api/auth.api";
import { Form, Input, Button } from "@nextui-org/react";
import { ThemeContext } from "../services/theme/theme.context";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(null);

    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

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
        <div className="grid grid-cols-2 w-6/12 mx-auto my-36 gap-10">
            <div>
                <img src={`${theme === "light" ? "/keptitude-light.png" : "/keptitude-dark.png"}`} width={125} />
                <div className="mt-6">
                    <h1 className="text-2xl font-bold">Welcome to admin panel</h1>
                    <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel sem facilisis, suscipit dolor ac, volutpat nisi. In vitae tristique nisi. </p>
                </div>
            </div>
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
                    classNames={{
                        inputWrapper: ["my-1"],
                    }}
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
                    classNames={{
                        inputWrapper: ["my-1"],
                    }}
                />
                <Button type="submit" className="bg-black dark:bg-white dark:text-black font-bold shadow-none w-full mt-2 text-white">
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