import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api/auth.api";
import { Form, Input, Button, Spinner, Card, Image } from "@heroui/react";
import { getStorage, getStorageByPromise, setStorage } from "../services/storage.service";

const Login = () => {
    const [email, setEmail] = useState(import.meta.env.MODE === 'development' ? "keptitude@gmail.com" : '');
    const [password, setPassword] = useState(import.meta.env.MODE === 'development' ? "123456" : '');
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    /**
     * handle login submission
     * @param {*} e 
     */
    const handleLogin = (e) => {
        setSubmitted(true);
        e.preventDefault();
        setError(null);
        loginUser(email, password).then(response => {
            if (response.code === "200" && response?.data?.ACCESS_TOKEN) {
                setStorage('authToken', response?.data?.ACCESS_TOKEN);
                checkIfTokenExists();
            }
            else {
                setError("Invalid credentials. Please try again.");
                setSubmitted(false);
            }
        })
    };

    /**
     * Fetch course list and update store
     */
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            checkIfTokenExists();
        }, 100);
        return () => clearTimeout(timeoutId);
    }, []);

    /**
     * method that checks token exists or not
     */
    const checkIfTokenExists = () => {
        getStorageByPromise('authToken').then(result => {
            if (result.flag && result.data) {
                setSubmitted(false);
                navigate("/dashboard");
            }
        })
    }

    return (
        <section style={{background: "linear-gradient(0deg, #35007F 0%, #4000BF 50%, #35007F 60.81%, #000000 93.75%)"}} 
        className="bg-[url('/images/signup-background-big.jpeg')] h-screen bg-cover bg-center bg-no-repeat">
            <article className="w-full pt-20">
                <div className="container mx-auto mt-20">
                    <Card className="p-10 w-4/12 mx-auto" radius="none">
                        <div className="text-center flex justify-center">
                            <Image
                                alt="HeroUI hero Image"
                                src="/images/torc_infotech_logo.jpeg"
                                width={60}
                            />
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl mt-2 font-bold">Welcome to Torc Admin</h1>
                        </div>
                        <div className="flex justify-center mt-10">
                            <Form className="w-full max-w-xs" validationBehavior="native"
                                onSubmit={handleLogin}>
                                <Input
                                    isRequired
                                    errorMessage="Please enter a valid email"
                                    label="Email"
                                    labelPlacement="outside"
                                    name="email"
                                    placeholder="Enter your email"
                                    type="email"
                                    variant="bordered"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    classNames={{
                                        inputWrapper: ["mb-2"]
                                    }}
                                />
                                <Input
                                    isRequired
                                    errorMessage="Please enter a valid password"
                                    label="Password"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    name="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    classNames={{
                                        inputWrapper: ["mb-2"],
                                    }}
                                />
                                <Button type="submit"
                                    isDisabled={submitted}
                                    className="bg-black dark:bg-white dark:text-black font-bold shadow-none w-full mt-2 text-white">
                                    Submit & Login
                                    {
                                        submitted ?
                                            <Spinner size="sm" color="default" /> : ''
                                    }
                                </Button>
                                {error && (
                                    <div className="text-small text-danger font-bold">
                                        {error}
                                    </div>
                                )}
                            </Form>
                        </div>
                    </Card>
                </div>
            </article>
        </section>
    );
};

export default Login;