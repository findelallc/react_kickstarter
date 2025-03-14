import { Card, Spinner, CardBody } from "@heroui/react";
import { ThemeContext } from "../../services/theme/theme.context";
import { useContext } from "react";

const LoadingSection = ({ text }) => {
    return <>
        <div className="grid grid-cols-1 mt-20">
            <Card className="bg-transparent" shadow="none" radius="sm">
                <CardBody>
                    <Spinner size="lg" color="primary" label={text || "Loading data.."} labelColor="foreground" />
                </CardBody>
            </Card>
        </div>
    </>
}

export const Loader = ({ full = false, text = '' }) => {

    const { theme } = useContext(ThemeContext);
    return <>
        {
            full ?
                <>
                    <div className={`fixed place-content-center top-0 left-0 w-full min-h-screen z-20 ` + `${theme === "light" ? "bg-white" : "bg-black"}`}>
                        <LoadingSection text={text}/>
                    </div>
                </>
                :
                <LoadingSection />
        }
    </>
}