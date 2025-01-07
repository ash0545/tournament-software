import Icon from "@/components/ui/custom/Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";

type Tab = {
  icon: keyof typeof dynamicIconImports;
  name: string;
};

export default function sidebar() {
  const upperTabs: Tab[] = [
    {
      icon: "home",
      name: "Tournament",
    },
    {
      icon: "home",
      name: "Events",
    },
    {
      icon: "home",
      name: "Users",
    },
    {
      icon: "home",
      name: "Statistics",
    },
  ];

  const bottonTab: Tab[] = [
    {
      icon: "home",
      name: "Settings",
    },
    {
      icon: "home",
      name: "Sign Out",
    },
  ];
  return (
    <div className="flex  flex-col p-4 bg-slate-200 w-full h-full justify-between">
      <div className="mt-40">
        {upperTabs.map((element, index) => {
          return <NavButton key={index} element={element}></NavButton>;
        })}
      </div>
      <div>
        {bottonTab.map((element, index) => {
          return <NavButton key={index} element={element}></NavButton>;
        })}
      </div>
    </div>
  );
}

function NavButton({ element }: { element: Tab }) {
  return (
    <div className="flex gap-6 p-4">
      {/* <Icon name={element.icon} /> */}
      <div className="w-6 h-6 bg-slate-500"></div>
      <div className="text-lg font-semibold text-slate-700">{element.name}</div>
    </div>
  );
}
