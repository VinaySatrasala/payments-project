import { usePathname, useRouter } from "next/navigation";

export default function SidebarItem({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  const handleClick = () : void => {
    router.push(href);
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
        selected ? "bg-green-500 text-white" : "text-gray-400 hover:bg-gray-800"
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0} // Add keyboard navigation support
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <div className={`h-6 w-6 ${selected ? "text-white" : "text-gray-400"}`}>
        {icon}
      </div>
      <div className={`font-medium ${selected ? "text-white" : "text-gray-300"}`}>
        {title}
      </div>
    </div>
  );
}
