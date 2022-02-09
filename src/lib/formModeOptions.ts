import { PencilIcon, PlusCircleIcon, ViewGridIcon } from "@heroicons/react/outline";

import type { ModeOption } from "~/components";

export const FormModeOptions: ModeOption[] = [
  { text: "Edit", icon: PencilIcon },
  { text: "New", icon: PlusCircleIcon },
  { text: "View", icon: ViewGridIcon },
];
