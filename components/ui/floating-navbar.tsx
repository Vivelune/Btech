"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  link: string;
  icon?: JSX.Element;
  drawerContent?: {
    title: string;
    description?: string;
    body: React.ReactNode;
  };
}

export const FloatingNav = ({
  navItems,
  className,
  contactDrawerContent,
}: {
  navItems: NavItem[];
  className?: string;
  contactDrawerContent?: {
    title: string;
    description?: string;
    body: React.ReactNode;
  };
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto z-[5000] items-center justify-center",
          className
        )}
      >
        <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/80 px-2 py-1.5 shadow-lg shadow-black/10 backdrop-blur-md dark:border-white/10 dark:bg-black/50">
          
          {/* Nav items container */}
          <div className="flex items-center gap-1">
            {navItems.map((navItem, idx: number) => {
              const hasDrawer = !!navItem.drawerContent;
              const linkContent = (
                <>
                  <span className="block sm:hidden">{navItem.icon}</span>
                  <span className="hidden sm:block">{navItem.name}</span>
                </>
              );

              if (hasDrawer) {
                return (
                  <Drawer key={`drawer-${idx}`}>
                    <DrawerTrigger className="relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white outline-none">
                      {linkContent}
                    </DrawerTrigger>
                    <DrawerContent className="max-h-[85vh] border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
                      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 overflow-hidden flex flex-col h-full max-h-[80vh]">
                        <DrawerHeader className="px-0 pt-6 pb-4 shrink-0">
                          <DrawerTitle className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                            {navItem.drawerContent?.title}
                          </DrawerTitle>
                          {navItem.drawerContent?.description && (
                            <DrawerDescription className="text-neutral-400 dark:text-neutral-500 mt-1">
                              {navItem.drawerContent.description}
                            </DrawerDescription>
                          )}
                        </DrawerHeader>
                        
                        {/* Dynamic Canvas Panel Layout */}
                        <div className="flex-1 overflow-hidden min-h-0">
                          {navItem.drawerContent?.body}
                        </div>

                        <DrawerFooter className="px-0 pt-4 pb-6 shrink-0 border-t border-neutral-100 dark:border-neutral-900 flex justify-end">
                          <DrawerClose asChild>
                            <Button variant="outline" className="rounded-xl px-5 font-medium text-xs">Dismiss View</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                );
              }

              return (
                <a
                  key={`link-${idx}`}
                  href={navItem.link}
                  className="relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {linkContent}
                </a>
              );
            })}
          </div>

          {/* Separation Guard */}
          <div className="h-5 w-px bg-neutral-200 dark:bg-white/10" />

          {/* Premium Contact Drawer Anchor */}
          <Drawer>
            <DrawerTrigger asChild>
              <button className="relative rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20 dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:shadow-white/20 outline-none">
                <span>Contact</span>
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
              <div className="mx-auto w-full max-w-md pb-8 pt-5 px-6">
                <DrawerHeader className="px-0 pt-0">
                  <DrawerTitle className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">{contactDrawerContent?.title}</DrawerTitle>
                  <DrawerDescription className="text-neutral-400 dark:text-neutral-500 mt-1">{contactDrawerContent?.description}</DrawerDescription>
                </DrawerHeader>
                <div className="py-2">
                  {contactDrawerContent?.body}
                </div>
                <DrawerFooter className="px-0 mt-4">
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full rounded-xl py-5 font-medium text-xs">Close Connection</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};