import { FC } from "react";

import { useField } from "formik";
import { Switch as HeadlessSwitch } from "@headlessui/react";

import { ArgumentTypes } from "~/lib";

type SwitchProps = Partial<ArgumentTypes<typeof HeadlessSwitch>[0]> & {
  name: string;
  label: string;
};

export const Switch: FC<SwitchProps> = ({ name, label, className, ...props }) => {
  const [field, meta, helpers] = useField({ name });

  const isInvalid = !!meta.error && meta.touched;
  const ring = isInvalid
    ? "ring-2 ring-red-300"
    : "focus-visible:ring-2 focus-visible:ring-blue-300";

  const enabled = field.value;

  return (
    <div className={className}>
      <label htmlFor={field.name} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <HeadlessSwitch
        as="div"
        {...field}
        checked={field.value}
        onChange={helpers.setValue}
        {...props}
        className={`${enabled ? "bg-blue-900" : "bg-slate-300"}
            relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${ring} focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-6" : "translate-x-0"}
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out`}
        />
      </HeadlessSwitch>
      {/* The empty space is there to avoid layout shift */}
      {isInvalid ? (
        <span className="truncate text-xs text-red-500">{meta.error}</span>
      ) : (
        <span className="text-xs">&nbsp;</span>
      )}
    </div>
  );
};
