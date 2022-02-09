import { FC, Fragment, useState } from "react";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export interface ModeOption {
  text: string;
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

interface SubHeaderProps {
  heading: string;
  currentMode: string;
  setCurrentMode: (val: string) => void;
  modeOptions: ModeOption[];
}

export const Header: FC<SubHeaderProps> = ({
  heading,
  currentMode,
  setCurrentMode,
  modeOptions,
}) => {
  const date = new Date();
  const opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };

  return (
    <div className="flex items-center justify-between border-b-[1px] border-b-slate-800 px-6 pb-3">
      <span className="text-4xl font-bold text-slate-800">{heading.toUpperCase()}</span>

      <div className="flex items-center">
        <span className="text-sm">
          Business Date: <b>{date.toLocaleString("en-US", opts)}</b>
        </span>

        <Menu as="div" className="relative ml-5">
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-opacity-75">
            {currentMode.toUpperCase()}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                {modeOptions.map((opt, i) => (
                  <Menu.Item key={i} onClick={() => setCurrentMode(opt.text)}>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-blue-500 text-white"
                            : opt.text === currentMode
                            ? "bg-blue-300 text-slate-800"
                            : "text-slate-800"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <opt.icon className="mr-2 h-5 w-5" aria-hidden="true" />
                        {opt.text.toUpperCase()}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
