import { PencilIcon, PlusCircleIcon, ViewGridIcon } from "@heroicons/react/outline";

import type { ModeOption } from "~/components";

export const FormModeOptions: ModeOption[] = [
  { text: "Edit", icon: PencilIcon },
  { text: "New", icon: PlusCircleIcon },
  { text: "View", icon: ViewGridIcon },
];

export const FormStepLabels = [
  "Primary Details",
  "Listing Details",
  "Risk Details",
  "Rating Details",
  "Other Details",
];

// Form field options
export const FormFieldOptions = {
  assetTypes: [
    { label: "Asset 1", value: "asset-1" },
    { label: "Asset 2", value: "asset-2" },
    { label: "Asset 3", value: "asset-3" },
  ],
  assetSubTypes: [
    { label: "Sub Asset 1", value: "sub-asset-1" },
    { label: "Sub Asset 2", value: "sub-asset-2" },
    { label: "Sub Asset 3", value: "sub-asset-3" },
  ],
  transactions: [
    { label: "Transaction 1", value: "transaction-1" },
    { label: "Transaction 2", value: "transaction-2" },
    { label: "Transaction 3", value: "transaction-3" },
  ],
};
