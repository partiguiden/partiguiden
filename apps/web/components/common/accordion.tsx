"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type AccordionProps = React.PropsWithChildren<{
  title: string;
}>;

export default function Accordion({ children, title }: AccordionProps) {
  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    setVisible((prevState) => !prevState);
  }

  return (
    <div>
      <button
        onClick={toggleVisible}
        aria-expanded={visible}
        className="bg-background-elevated-light dark:bg-background-elevated-dark-200 group flex w-full items-center justify-between rounded px-4 py-3 text-xl sm:text-2xl"
      >
        <span>{title}</span>
        <ChevronDownIcon className="inline h-6 w-6 transition-transform group-aria-expanded:rotate-180" />
      </button>
      <div aria-hidden={!visible} className="mt-4 aria-hidden:hidden">
        {children}
      </div>
    </div>
  );
}
