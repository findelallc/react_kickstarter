import { User, Card, Button, Chip, Image, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { getStorage, clearStorage, setStorage, getStorageByPromise } from "../services/storage.service";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../services/theme/theme.context";
import Icons from "./utils/Icons";
import { useContext, useMemo, useState, useEffect, useRef } from "react";
import { decodeTokenManually } from "../services/utils.service";
import { globalStore } from "../services/store/global.store";
import { Link } from "react-router-dom";

const Header = () => {

    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);

    /**
     * Logout event
     */
    const handleLogout = () => {
        clearStorage();
        getStorageByPromise("authToken").then(response => {
            if (!response.data) {
                globalStore.resetStore();
                navigate("/");
            }
        })
    };

    /**
     * Set user details
     */
    useEffect(() => {
        if (!Object.keys(userDetails).length && getStorage("authToken")) {
            const tokenData = decodeTokenManually(getStorage("authToken"));
            setUserDetails({
                ...tokenData,
                ROLE: JSON.parse(tokenData.ROLE).ROLES[0],
            });
        }
    }, [userDetails]);

    return (
        <Card className="rounded-none shadow-sm border-b-stone-200 dark:border-b-stone-800 border-b-1">
            <CardBody className="px-5 grid grid-cols-2 py-0">
                <div className="my-auto flex gap-10">
                    <Image
                        alt="nextui logo"
                        radius="sm"
                        className="rounded-none my-2"
                        src={`${theme === "light" ? "/images/torc_infotech_logo.jpeg" : "/images/torc_infotech_logo.jpeg"}`}
                        width={33}
                    />
                    <div className="flex gap-4 my-auto">
                        <Link to={"/dashboard"} color="foreground"
                            className={"py-3 px-2 " + `${location.pathname.includes("dashboard") ? 'bg-primary text-white font-bold' : 'font-medium '}`}>
                            Dashboard
                        </Link>
                    </div>
                </div>
                <div className="my-auto flex gap-3 justify-end">
                    <Dropdown showArrow backdrop="opaque">
                        <DropdownTrigger>
                            <Button isIconOnly color="primary" className="rounded-md mr-4">
                                <Icons.RxDashboard size={22} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" classNames={{ list: 'grid grid-cols-2 text-center py-2 max-w-[320px]' }}>
                            <DropdownItem key="home" textValue="home" className="hover:bg-transparent">
                                <span className="flex justify-center"><Icons.MdOutlineSettings className="text-warning" size={25} /></span>
                                <Link href="#" color="foreground">Workspace</Link>
                            </DropdownItem>
                            <DropdownItem key="user" textValue="user" className="hover:bg-transparent">
                                <span className="flex justify-center"><Icons.PiUsersThreeBold className="text-danger" size={25} /></span>
                                <Link href="#" color="foreground">Users</Link>
                            </DropdownItem>
                            <DropdownItem key="feedback" textValue="feedback" className="hover:bg-transparent">
                                <span className="flex justify-center"><Icons.VscFeedback size={25} className="text-success" /></span>
                                <Link href="#" color="foreground">Feedback</Link>
                            </DropdownItem>
                            <DropdownItem key="blogging" textValue="blogging" className="hover:bg-transparent">
                                <span className="flex justify-center"><Icons.ImBlog size={25} className="text-primary" /></span>
                                <Link href="#" color="foreground">Blogging</Link>
                            </DropdownItem>
                            <DropdownItem key="questions" textValue="questions" className="hover:bg-transparent">
                                <span className="flex justify-center"><Icons.FcQuestions size={25} /></span>
                                <Link href="#" color="foreground">Questions</Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown placement="bottom-start" backdrop="blur">
                        <DropdownTrigger>
                            <User
                                as="button"
                                avatarProps={{
                                    src: "https://ui-avatars.com/api/?background=FBBC05&rounded=true&font-size=0.4&color=000000&name=" + userDetails.FIRST_NAME + "+" + userDetails.LAST_NAME,
                                }}
                            />
                        </DropdownTrigger>
                        <DropdownMenu variant="flat" disabledKeys={["settings", "team_settings"]}>
                            <DropdownItem key="profile" textValue="profile" className="h-26">
                                <p>Signed in as</p>
                                <p className="font-bold">{userDetails.EMAIL}</p>
                                <Chip
                                    classNames={{
                                        base: "bg-gradient-to-br mt-1 from-indigo-500 to-pink-500 shadow-none",
                                        content: "text-white font-bold uppercase",
                                    }}
                                    variant="shadow"
                                    radius="sm" size="sm"
                                >
                                    {userDetails.ROLE}
                                </Chip>

                            </DropdownItem>
                            <DropdownItem key="settings">My Profile</DropdownItem>
                            <DropdownItem key="team_settings">Team Settings</DropdownItem>
                            <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardBody>
        </Card>
    );
}

export default Header;
