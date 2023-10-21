"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import useOutsideClick from "@lib/hooks/use-outside-click";
import type { NavigationEntry, RouteEntry } from "@lib/navigation";

const tabClassName = twMerge(
  "min-w-[90px] flex-shrink-0 whitespace-nowrap p-4 text-sm uppercase hover:opacity-80",
  "border-teal-500 focus-visible:outline-2 focus-visible:-outline-offset-2 dark:border-teal-600",
  "aria-current-page:border-b-2",
);

interface DropdownProps {
  title: string;
  routes: RouteEntry[];
  navRef: React.RefObject<HTMLElement | null>;
}

function Dropdown({ routes, title, navRef }: DropdownProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [xPosition, setXPosition] = useState<number>();

  function handleClick() {
    setIsVisible((prevState) => !prevState);
  }

  function handleClose() {
    setIsVisible(false);
  }

  const ref = useOutsideClick<HTMLDivElement>(handleClose);

  function handleScroll() {
    const currentX = ref.current?.getBoundingClientRect().x;
    setXPosition(currentX);
  }

  useEffect(() => {
    if (!navRef.current) return;

    navRef.current.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref}>
      <button
        className={twMerge(tabClassName, "inline-flex gap-2")}
        onClick={handleClick}
        aria-expanded={isVisible}
      >
        {title} <ChevronDownIcon className="h-4 w-4 self-center" />
      </button>
      <ul
        aria-hidden={!isVisible}
        style={
          isVisible && xPosition !== undefined
            ? {
                left: xPosition,
              }
            : undefined
        }
        className={twMerge(
          "absolute mt-1 flex-col rounded shadow-md ",
          "bg-slate-100 text-slate-950 dark:bg-slate-700 dark:text-slate-50",
          "flex aria-hidden:hidden",
        )}
      >
        {routes.map(({ href, title, Icon }) => (
          <li key={href} className="text-left">
            <Link
              href={href}
              className="flex items-center gap-2 px-3 py-2 hover:opacity-75"
              onClick={handleClose}
            >
              {Icon && <Icon />}
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface TabEntryProps {
  item: NavigationEntry;
  navRef: React.RefObject<HTMLElement | null>;
}

export default function TabEntry({ item, navRef }: TabEntryProps) {
  const pathname = usePathname();

  if ("subPages" in item) {
    return (
      <Dropdown routes={item.subPages} title={item.title} navRef={navRef} />
    );
  }

  return (
    <Link
      key={item.href}
      href={item.href}
      aria-current={
        (item.href === pathname ||
          new RegExp(`^${item.href}/.*`).test(pathname)) &&
        "page"
      }
      className={tabClassName}
    >
      {item.title}
    </Link>
  );
}
