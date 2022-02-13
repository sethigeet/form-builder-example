import { Fragment, ReactElement } from "react";

import { Formik, Form as FormikForm } from "formik";
import * as yup from "yup";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import {
  Input,
  InputProps,
  Select,
  SelectProps,
  SelectOption,
  Switch,
  SwitchProps,
} from "~/components/form";

type FormItemType = "input" | "select" | "switch";
type FormItemProps<T> = Omit<T, "label" | "name">;
type ValidationSchema = Record<string, any>; // TODO: find a better way to type this
type FormValues = Record<string, any>;

type FormItem = {
  label: string;
  name: string;
  defaultValue?: any;
  validation?: ValidationSchema;
} & (
  | {
      type: "input";
      props?: FormItemProps<InputProps>;
    }
  | {
      type: "select";
      options: SelectOption[];
      props?: FormItemProps<SelectProps>;
    }
  | {
      type: "switch";
      props?: FormItemProps<SwitchProps>;
    }
);

class FormItemBuilder {
  private label: string;
  public name: string;
  public defaultValue: any;
  private type: FormItemType;
  private props?: Record<string, any>;
  private options?: SelectOption[];
  validation?: ValidationSchema;

  constructor(schema: FormItem) {
    this.label = schema.label;
    this.name = schema.name;
    this.defaultValue = schema.defaultValue;
    this.type = schema.type;
    if (schema.type === "select") {
      this.options = schema.options;
    }
    this.validation = schema.validation;
    this.props = schema.props;
  }

  private getInput(): ReactElement {
    return (
      <Input
        name={this.name}
        label={this.label}
        {...this.props}
        className={`w-56 ${this.props?.className || ""}`}
      />
    );
  }

  private getSelect(): ReactElement {
    if (!this.options) {
      throw new Error("options is required for a form field of type 'select'");
    }

    return (
      <Select
        name={this.name}
        label={this.label}
        options={this.options}
        {...this.props}
        className={`w-56 ${this.props?.className || ""}`}
      />
    );
  }

  private getSwitch(): ReactElement {
    return <Switch name={this.name} label={this.label} {...this.props} />;
  }

  render(): ReactElement {
    switch (this.type) {
      case "input":
        return this.getInput();
      case "select":
        return this.getSelect();
      case "switch":
        return this.getSwitch();
    }
  }
}

interface FormGroup {
  label: string;
  items: FormItem[];
}

class FormGroupBuilder {
  private label: string;
  public items: FormItemBuilder[] = [];

  constructor(schema: FormGroup) {
    this.label = schema.label;
    this.items = schema.items.map((item) => new FormItemBuilder(item));
  }

  render(): ReactElement {
    return (
      <div>
        <h2 className="text-2xl font-medium">{this.label}</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2">
          {this.items.map((item, i) => (
            <Fragment key={i}>{item.render()}</Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export interface Form {
  title: string;
  groups: FormGroup[];
}

export class FormBuilder {
  private title: string;
  private groups: FormGroupBuilder[];

  constructor(schema: Form) {
    this.title = schema.title;
    this.groups = schema.groups.map((group) => new FormGroupBuilder(group));
  }

  private getValidationSchema() {
    const validationSchema: ValidationSchema = {};

    for (const group of this.groups) {
      for (const item of group.items) {
        if (item.validation) {
          validationSchema[item.name] = item.validation;
        }
      }
    }

    return yup.object().shape(validationSchema);
  }

  private getDefaultValues() {
    const defaultValues: FormValues = {};

    for (const group of this.groups) {
      for (const item of group.items) {
        if (item.validation) {
          defaultValues[item.name] = item.defaultValue;
        }
      }
    }

    return defaultValues;
  }

  renderGroups(): ReactElement {
    let className: string;
    if (this.groups.length % 2 == 0) {
      className = "";
    } else {
      className = "col-span-2 mx-auto max-w-max";
    }

    return (
      <>
        {this.groups.slice(0, -1).map((group, i) => {
          return <Fragment key={i}>{group.render()}</Fragment>;
        })}
        <div className={className}>{this.groups[this.groups.length - 1].render()}</div>
      </>
    );
  }

  render(next: () => void, back: () => void): ReactElement {
    return (
      <div className="mt-16 grid place-items-center">
        <div className="max-w-6xl rounded-2xl bg-gray-100 p-10">
          <Formik
            initialValues={this.getDefaultValues()}
            onSubmit={(vals) => {
              console.log(vals);
              next();
            }}
            validationSchema={this.getValidationSchema()}
          >
            {(_) => (
              <FormikForm className="grid grid-cols-2 gap-10">
                {this.renderGroups()}

                <div className="col-span-2 mt-4 flex">
                  <button
                    className="mr-auto flex items-center justify-center rounded-lg bg-gray-300 p-3 text-lg font-bold text-slate-800"
                    type="button"
                    onClick={back}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                    Back
                  </button>

                  <button
                    type="submit"
                    className="ml-auto flex items-center justify-center rounded-lg bg-blue-900 p-3 text-lg font-bold text-white"
                  >
                    Next
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </div>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
