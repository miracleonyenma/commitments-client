"use client";

import Link from "next/link";
import SiteLogo from "@/components/Site/Logo";
import { useUserStore } from "@/store/useUserStore";
import AuthUserButton from "@/components/Auth/User/Button";

const SiteHeader = () => {
  const { user } = useUserStore();
  return (
    <header className="site-header sticky top-0 z-30 w-full p-3">
      <div className="wrapper mx-auto flex max-w-4xl justify-between gap-4 rounded-2xl bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
        <Link href="/">
          <SiteLogo />
        </Link>

        <nav className="site-nav">
          <div className="wrapper h-full">
            <ul className="flex h-full flex-wrap items-center gap-4">
              {!user && (
                <li className="flex items-center">
                  <Link href="/auth/login">Login</Link>
                </li>
              )}
              <li className="flex items-center">
                <AuthUserButton user={user} />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
