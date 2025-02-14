"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  const handleHome = () => {
    router.push("/");
  };

  const handleAbout = () => {
    router.push("/about");
  };

  // Hide the sign in part if we're on the sign-in or sign-up pages
  const hideSignIn = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <nav className="flex items-center space-x-4 p-4 bg-gray-50 shadow">
      <Image src="/project.png" alt="logo" width={50} height={50} />
      <Button onClick={handleHome}>Home</Button>
      <Button onClick={handleAbout}>About</Button>
      <Button>
        <Link href="/contact" className="text-gray-600 hover:text-gray-900">
          Contact
        </Link>
      </Button>
      {session ? (
        <Button onClick={handleSignOut}>Sign-Out</Button>
      ) : (
        !hideSignIn && (
          <div
            onClick={() => router.push("/sign-in")}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            Sign in
          </div>
        )
      )}
    </nav>
  );
};

export default Navbar;
