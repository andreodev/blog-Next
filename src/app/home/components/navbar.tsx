import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md ">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-6">
          <div className="text-3xl font-semibold text-gray-800 ml-4">LOGO</div>
        </div>

        <div className="flex space-x-6">
          <ul className="flex space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:text-blue-500 font-normal m-0">
                    Categorias
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink className="hover:text-blue-500">Linkddddddddddddd</NavigationMenuLink>
                    <NavigationMenuLink className="hover:text-blue-500">Link</NavigationMenuLink>
                    <NavigationMenuLink className="hover:text-blue-500">Link</NavigationMenuLink>
                    <NavigationMenuLink className="hover:text-blue-500">Link</NavigationMenuLink>
                    <NavigationMenuLink className="hover:text-blue-500">Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <li className="hover:text-blue-500 mt-1">O que tem de novo?</li>
            <li className="hover:text-blue-500 mt-1">Sales</li>
            <li className="hover:text-blue-500 mt-1">Help</li>
          </ul>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="search" className="hidden">Search</label>
          <Input
            id="search"
            type="text"
            placeholder="Search..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9]"
          />
        </div>

        <div className="flex space-x-6">
          <ul className="flex space-x-6">
            <li className="hover:text-blue-500">Account</li>
            <li className="hover:text-blue-500">Cart</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
