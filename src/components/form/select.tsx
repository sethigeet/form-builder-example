import { FC, Fragment } from "react";

import { useField } from "formik";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  CheckIcon,
  ExclamationCircleIcon,
  SelectorIcon,
} from "@heroicons/react/outline";

import { ArgumentTypes } from "~/lib";

export interface SelectOption {
  label: string;
  value: string;
}

export type SelectProps = Partial<ArgumentTypes<typeof Listbox>[0]> & {
  name: string;
  label: string;
  placeholder?: string;
  options: SelectOption[];
};

export const Select: FC<SelectProps> = ({
  name,
  label,
  options,
  className,
  placeholder,
  ...props
}) => {
  const [field, meta, helpers] = useField({ name });

  const isInvalid = !!meta.error && meta.touched;
  const isValid = !meta.error && meta.touched;
  const ring = isInvalid
    ? "ring-2 ring-red-300"
    : "focus-visible:ring-2 focus-visible:ring-blue-300";

  const selectedLabel = options.find((val) => val.value === field.value)?.label;

  return (
    <div className={className}>
      <label htmlFor={field.name} className="block text-sm font-medium text-slate-800">
        {label}
      </label>

      <Listbox {...field} onChange={helpers.setValue} {...props} as="div" id={field.name}>
        <div className="relative mt-1 w-full">
          <Listbox.Button
            className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md transition-shadow duration-300 focus:outline-none ${ring} focus-visible:ring-opacity-75`}
          >
            {selectedLabel ? (
              <span className="block truncate">{selectedLabel}</span>
            ) : (
              <span className="block truncate text-sm text-slate-400">
                {placeholder || "Select an option"}
              </span>
            )}
            <ExclamationCircleIcon
              className={`pointer-events-none absolute top-1/2 right-8 h-5 w-5 -translate-y-1/2 ${
                isInvalid ? "text-red-300" : "text-transparent"
              } transition-colors duration-300`}
              aria-hidden="true"
            />
            <CheckCircleIcon
              className={`pointer-events-none absolute top-1/2 right-8 h-5 w-5 -translate-y-1/2 ${
                isValid ? "text-green-300" : "text-transparent"
              } transition-colors duration-300`}
              aria-hidden="true"
            />
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            enter="transition ease-in duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-slate-800 ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map(({ label, value }) => (
                <Listbox.Option
                  key={value}
                  className={({ active }) =>
                    `${
                      active ? "bg-blue-300" : ""
                    } relative cursor-default select-none py-2 pl-10 pr-4 text-slate-800`
                  }
                  value={value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`${selected ? "font-medium" : "font-normal"} block truncate`}
                      >
                        {label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-900">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {/* The empty space is there to avoid layout shift */}
      {isInvalid ? (
        <span className="truncate text-xs text-red-500">{meta.error}</span>
      ) : (
        <span className="text-xs">&nbsp;</span>
      )}
    </div>
  );
};
