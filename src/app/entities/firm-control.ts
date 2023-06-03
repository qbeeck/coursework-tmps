class CustomForm {
  name!: string;
  description!: string;
  firmControls: CustomFormControll[] = [];

  setName(name: string): void {
    this.name = name;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  addFirmControl(firmControl: CustomFormControll): void {
    this.firmControls.push(firmControl);
  }
}

abstract class CustomFormControll {
  isAnswered!: boolean;
}

class SectionFirmControl extends CustomFormControll {
  constructor() {
    super();
  }
}

class QuestionFirmControl extends CustomFormControll {
  constructor() {
    super();
  }
}


/**
 * Builder Pattern
 */
export class FirmBuilder {
  private _form = new CustomForm();

  setName(title: string): FirmBuilder {
    this._form.setName(title);
    return this;
  }

  addControl(control: CustomFormControll): FirmBuilder {
    this._form.addFirmControl(control);
    return this;
  }

  reset(): FirmBuilder {
    this._form = new CustomForm();
    return this;
  }

  build(): CustomForm {
    const form = this._form;
    this.reset();

    return form;
  }
}
