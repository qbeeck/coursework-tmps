import { CustomFormControl } from "./firm-control";

/**
 * Memento pattern
 */
export class CustomFormMemento {
  name: string;
  description: string;
  controls: CustomFormControl[];

  constructor(name: string, description: string, controls: CustomFormControl[]) {
    this.name = name;
    this.description = description;
    this.controls = controls;
  }
}
