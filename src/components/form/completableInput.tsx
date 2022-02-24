import { DetailedHTMLProps, FC, Fragment, InputHTMLAttributes, useState } from "react";

import { useField } from "formik";
import { Combobox, Transition } from "@headlessui/react";
import { CheckCircleIcon, CheckIcon, ExclamationCircleIcon } from "@heroicons/react/outline";

export type CompletableItem = string;

export type CompletableInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  label: string;
  items: CompletableItem[];
};

export const CompletableInput: FC<CompletableInputProps> = ({
  name,
  label,
  items,
  className,
  ...props
}) => {
  const [field, meta, helpers] = useField({ name });
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) =>
          item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const isInvalid = !!meta.error && meta.touched;
  const isValid = !meta.error && meta.touched;
  const ring = isInvalid ? "ring-2 ring-red-300" : "focus-within:ring-2 focus-within:ring-blue-300";

  return (
    <div className={className}>
      <label htmlFor={field.name} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <Combobox
        {...field}
        onChange={helpers.setValue}
        {...props}
        as="div"
        className={`relative mt-1 w-full rounded-md bg-white shadow-md transition-shadow duration-300 ${ring} focus-within:ring-opacity-75`}
      >
        <div className="relative w-full overflow-hidden">
          <Combobox.Input
            onChange={(e) => setQuery(e.target.value)}
            placeholder={props.placeholder}
            className="w-full rounded-md border-none py-1 pr-8 pl-3 outline-none placeholder:text-sm placeholder:text-slate-400 focus:border-none focus:outline-none focus:ring-0 disabled:bg-gray-300 disabled:text-gray-500"
            id={field.name}
          />
          <ExclamationCircleIcon
            className={`pointer-events-none absolute top-1/2 right-2 h-5 w-5 -translate-y-1/2 ${
              isInvalid ? "text-red-300" : "text-transparent"
            } transition-colors duration-300`}
            aria-hidden="true"
          />
          <CheckCircleIcon
            className={`pointer-events-none absolute top-1/2 right-2 h-5 w-5 -translate-y-1/2 ${
              isValid ? "text-green-300" : "text-transparent"
            } transition-colors duration-300`}
            aria-hidden="true"
          />
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-in duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredItems.map((item, i) => (
                <Combobox.Option
                  key={i}
                  className={({ active }) =>
                    `${
                      active ? "bg-blue-300" : ""
                    } relative cursor-default select-none py-2 pl-10 pr-4 text-slate-800`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`${selected ? "font-medium" : "font-normal"} block truncate`}
                      >
                        {item}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-900">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>

      {/* The empty space is there to avoid layout shift */}
      {isInvalid ? (
        <span className="truncate text-xs text-red-500">{meta.error}</span>
      ) : (
        <span className="text-xs">&nbsp;</span>
      )}
    </div>
  );
};
