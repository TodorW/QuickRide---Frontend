import { AuthService, UserService } from "../../api/api";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await UserService.GetProfile();
        setIsAdmin(response.data.user.is_admin);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const success = await AuthService.logout();
      if (success) {
        console.log("Logout successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <header className="bg-gray-900 text-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/home" className="-m-1.5 p-1.5">
            <span className="sr-only">QuickRide</span>
            <img
              alt=""
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto border border-indigo-600 p-1 rounded"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300 hover:text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a
            href="/home"
            className="text-sm font-semibold leading-6 text-gray-200"
          >
            Home
          </a>
          <a
            href="/dashboard"
            className="text-sm font-semibold leading-6 text-gray-200"
          >
            Dashboard
          </a>
          {isAdmin ? (
            <a
              href="http://tim1.cortexakademija.com/admin"
              className="text-sm font-semibold leading-6 text-gray-200"
            >
              Admin Panel
            </a>
          ) : (
            <div></div>
          )}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-200">
              <UserIcon className="h-6 w-6 inline-block" aria-hidden="true" />
              Profile
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute -right-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-gray-800 shadow-lg ring-1 ring-gray-900/5 transition"
            >
              <div className="p-4">
                <a
                  href="/my-profile"
                  className="block font-semibold text-gray-200 hover:bg-gray-700 p-2 rounded"
                >
                  View Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="block font-semibold text-gray-200 hover:bg-gray-700 p-2 rounded w-full text-left"
                >
                  Logout
                </button>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Quick Ride</span>
              <img
                alt=""
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto border border-indigo-600 p-1 rounded"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-300 hover:text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/home"
                  className="block rounded-lg py-2 pl-3 pr-3 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                >
                  Home
                </a>
                <a
                  href="/dashboard"
                  className="block rounded-lg py-2 pl-3 pr-3 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                >
                  Dashboard
                </a>
                {isAdmin ? (
                  <a
                    href="http://tim1.cortexakademija.com/admin"
                    className="block rounded-lg py-2 pl-3 pr-3 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                  >
                    Admin Panel
                  </a>
                ) : null}
              </div>
              <div className="py-6">
                <a
                  href="/my-profile"
                  className="block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                >
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700 w-full text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
