import NotWork from "@/components/not-work";
import Navigation from "@/components/site/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <div className="fixed top-0 left-[35vw] z-50">
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
