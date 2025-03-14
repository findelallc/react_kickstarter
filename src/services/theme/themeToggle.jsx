import { useContext } from "react";
import { ThemeContext } from "./theme.context";
import Icons from "../../components/utils/Icons";

import { Button, Tooltip } from "@heroui/react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Tooltip placement="left" showArrow content={"Switch to " + (theme === "light" ? 'dark mode' : 'light mode')}>
      <Button onPress={toggleTheme} size="md" isIconOnly className="fixed right-6 bottom-6 z-10">
        {theme === "light" ? <Icons.FaRegLightbulb size={18} /> : <Icons.FaLightbulb size={18} className="text-warning-600" />}
      </Button>
    </Tooltip>
  );
};

export default ThemeToggle;