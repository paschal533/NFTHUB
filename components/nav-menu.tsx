import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const NavMenu = () => {
  const router = usePathname();
  const currentRoute = router;

  const links = [
    { name: "Home", href: "/" },
    {
      name: "Marketplace",
      href: "/marketplace",
    },
    { name: "Arena", href: "/arena" },
  ];

  return (
    <ul className="flex flex-row justify-center w-full items-center list-none sm:flex-col sm:h-full">
      {links.map((link) => (
        <li
          key={link.name}
          onClick={() => {}}
          className={`flex flex-row items-center font-poppins font-semibold text-base hover:text-white mx-3 sm:my-5 sm:text-xl
            ${currentRoute === link.href ? "text-white" : "text-[#a39a9a]"} 
            `}
        >
          <Link href={link.href}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
