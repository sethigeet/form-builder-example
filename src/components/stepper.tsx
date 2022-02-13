import { Children, FC } from "react";

import { Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";

interface StepperProps {
  activeStep: number;
  labels: string[];
  children: JSX.Element[];
}

export const Stepper: FC<StepperProps> = ({ activeStep, labels, children }) => {
  const steps = Children.toArray(children);

  if (labels.length !== steps.length) {
    throw new Error("The lenght of the labels and the number of children must be the same!");
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        {labels.map((label, i) => {
          const isLast = i === steps.length - 1;
          const isCompleted = i < activeStep;
          const isActive = i === activeStep;

          return (
            <div key={i} className="flex items-center justify-center">
              <div className="relative text-center">
                <div
                  className={`relative grid aspect-square h-16 place-items-center overflow-hidden rounded-full ${
                    isCompleted
                      ? ""
                      : isActive
                      ? "border-2 border-blue-900"
                      : "border-2 border-gray-300"
                  } ${isCompleted ? "text-white" : "text-slate-800"} transition-all`}
                >
                  <div
                    className={`absolute z-10 h-full w-full bg-blue-900 ${
                      isCompleted ? "" : "-translate-x-full"
                    } transition-transform duration-500 ${isActive ? "delay-500" : ""}`}
                  />
                  {isCompleted ? (
                    <CheckIcon className="z-20 h-8" />
                  ) : (
                    <span className="z-20 text-2xl font-bold">{i + 1}</span>
                  )}
                </div>
                <div className="absolute left-1/2 mt-2 w-28 -translate-x-1/2 text-center">
                  <span className={`font-slate-800 text-sm ${isActive ? "font-bold" : ""}`}>
                    {label}
                  </span>
                </div>
              </div>
              {!isLast && (
                <div className="relative overflow-hidden">
                  <div
                    className={`absolute z-10 h-full w-full bg-blue-900 ${
                      isCompleted ? "" : "-translate-x-full"
                    } transition-transform duration-500 ${isActive ? "" : "delay-500"}`}
                  />
                  <div className="h-0.5 w-full min-w-[90px] bg-gray-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        {steps.map((step, i) => (
          <Transition
            show={activeStep === i}
            enter="transition-opacity duration-200 delay-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            key={i}
          >
            {step}
          </Transition>
        ))}
      </div>
    </div>
  );
};
