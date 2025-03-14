import { Card, CardHeader, Listbox, CardBody, CardFooter, ListboxItem, Divider, Image } from "@heroui/react";
import { ThemeContext } from "../services/theme/theme.context";
import { useContext } from "react";

export default function Sidebar() {
  const { theme } = useContext(ThemeContext);

  return (
    <Card className="w-[200px] rounded-none shadow-sm border-r-1 border-r-stone-200 dark:border-r-stone-800">
      <CardHeader className="rounded-none py-4">
        <Image
          alt="nextui logo"
          radius="sm"
          className="rounded-none ml-3"
          src={`${theme === "light" ? "/images/keptitude-light.png" : "/images/keptitude-dark.png"}`}
          width={120}
        />
      </CardHeader>
      <CardBody>
        <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
          <ListboxItem key="new">Dashboard</ListboxItem>
          <ListboxItem key="curriculum">Curriculum</ListboxItem>
          <ListboxItem key="edit">Tests</ListboxItem>
        </Listbox>
      </CardBody>
      <Divider />
      <CardFooter>
        <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
          <ListboxItem key="copy">Question Bank</ListboxItem>
          <ListboxItem key="edit">New Course</ListboxItem>
        </Listbox>
      </CardFooter>
    </Card>
  );
}
