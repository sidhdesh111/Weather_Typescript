import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/Theme_Provider";
import { LuMoon } from "react-icons/lu";
import { LuSunMedium } from "react-icons/lu";
import SearchBar from "./SearchBar";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="w-full sticky top-0 z-50 py-4 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container! mx-auto px-6 lg:px-10 flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={
              isDark
                ? "./assets/Climate_dark_mode_logo.png"
                : "./assets/Climate_light_mode_logo.png"
            }
            alt="Climate Logo"
            className="h-12"
          />
        </Link>

        <div className="flex items-center justify-between gap-4">
          {/* search */}
          <SearchBar />
          {/* theme toggle */}
          <div
            className={`ml-2cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-none"}`}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? (
              <LuSunMedium className="text-[1.5rem] text-orange-500   transition-all rotate-0" />
            ) : (
              <LuMoon className="text-[1.5rem] text-gray-600 transition-all rotate-0" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
