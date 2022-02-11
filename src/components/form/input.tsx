import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

import { useField } from "formik";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/outline";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string;
  label: string;
};

export const Input: FC<InputProps> = ({ name, label, className, ...props }) => {
  const [field, meta] = useField({ name });

  const isInvalid = !!meta.error && meta.touched;
  const isValid = !meta.error && meta.touched;
  const ring = isInvalid ? "ring-2 ring-red-300" : "focus-within:ring-2 focus-within:ring-blue-300";

  return (
    <div className={className}>
      <label htmlFor={field.name} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <div
        className={`relative mt-1 w-full rounded-md bg-white shadow-md transition-shadow duration-300 ${ring} overflow-hidden focus-within:ring-opacity-75`}
      >
        <input
          {...field}
          {...props}
          className="w-full border-none py-1 pr-8 pl-3 outline-none placeholder:text-sm placeholder:text-slate-400 focus:border-none focus:outline-none disabled:bg-gray-300 disabled:text-gray-500"
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
      {/* The empty space is there to avoid layout shift */}
      {isInvalid ? (
        <span className="truncate text-xs text-red-500">{meta.error}</span>
      ) : (
        <span className="text-xs">&nbsp;</span>
      )}
    </div>
  );
};
