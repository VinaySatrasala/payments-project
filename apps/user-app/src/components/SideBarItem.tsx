import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const SidebarItem = ({
    href,
    title,
    icon,
  }: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;
  
    return (
      <div
        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
          selected ? "bg-green-500 text-white" : "text-gray-400 hover:bg-gray-800"
        }`}
        onClick={() => router.push(href)}
      >
        <div className={`h-6 w-6 ${selected ? "text-white" : "text-gray-400"}`}>{icon}</div>
        <div className={`font-medium ${selected ? "text-white" : "text-gray-300"}`}>
          {title}
        </div>
      </div>
    );
  };