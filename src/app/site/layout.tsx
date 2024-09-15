import NotWork from "@/components/not-work";
import Navigation from "@/components/site/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <div className="fixed top-[-2vh] sm:top-0 sm:left-[20vw] md:left-[20vw] z-50 max-sm:left-[20px] text-xs lg:left-[35vw]">
        <NotWork />
      </div>
      <main className="h-[95vh]">
        <Navigation />
        {children}
      </main>
    </ClerkProvider>
  );
};

export default layout;
