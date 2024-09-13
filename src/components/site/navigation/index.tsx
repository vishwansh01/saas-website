import { ModeToggle } from "@/components/global/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserButton } from "@clerk/nextjs";
import { currentUser, User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  user?: null | User;
};

const Navigation = async ({ user }: Props) => {
  const u = await currentUser();
  return (
    // <div className="w-[50vw]">
    <div className="fixed top-10 right-0 left-0 p-4 flex items-center justify-between z-50">
      <aside className="flex items-center gap-2">
        <Image
          src={"./assets/plura-logo.svg"}
          width={40}
          height={40}
          alt="plur logo"
        />
        <span className="text-xl font-bold"> Saas.</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8 hover:underline hover:text-blue-800">
          {/* <Link
          //   href={`${process.env.NEXT_PUBLIC_SCHEME}${process.env.NEXT_PUBLIC_DOMAIN}/agency`}
          // >
          //   Go to agency/subaccout dashboard
          // </Link> */}
          {/* <Link href={"#"}>About</Link>
          <Link href={"#"}>Documentation</Link>
          <Link href={"#"}>Features</Link> */}
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        {!u && (
          <Link
            href={"/agency"}
            className="bg-primary text-white md:p-2 px-4 md:rounded-md hover:bg-primary/80 text-[12] rounded-sm"
          >
            Login
          </Link>
        )}
        <Link
          href={"https://github.com/vishwansh01/saas-website"}
          className="bg-primary text-white md:p-2 md:px-4 md:rounded-md hover:bg-primary/80 text-[12px] sm:p-[4px] px-[4px] rounded-sm"
        >
          Github
        </Link>
        <HoverCard>
          <HoverCardTrigger>
            <p className="text-white md:p-2 md:px-4 md:rounded-md hover:underline hover:cursor-pointer text-xs">
              Features
            </p>
          </HoverCardTrigger>
          <HoverCardContent>
            <ul>
              <li className="p-2 font-semibold">• Agency Account for Owners</li>
              <li className="p-2 font-semibold">•Role Based access</li>
              <li className="p-2 font-semibold">•Pipelines</li>
              <li className="p-2 font-semibold">
                •Funnels Building and Hosting
              </li>
              <li className="p-2 font-semibold">
                •Managing Sub Account made easier
              </li>
              <li className="p-2 font-semibold">•Stripe Connect</li>
              <li className="p-2 font-semibold">
                •DashBoards for Agnecy and subaccount
              </li>
              <li className="p-2 font-semibold">•Stripe Add on products</li>
              <li className="p-2 font-semibold">•Stripe Subscription plans</li>
              <li className="p-2 font-semibold">•Notifications</li>
              <li className="p-2 font-semibold">•Graphs and Charts</li>
            </ul>
          </HoverCardContent>
        </HoverCard>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
    // </div>
  );
};

export default Navigation;
