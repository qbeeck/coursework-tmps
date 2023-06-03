abstract class CustomFormControl {
  type: string;

  constructor(type: string) {
    this.type = type;
  }
}

class SectionCustomFormControl extends CustomFormControl {
  name: string;
  sectionControls: QuestionCustomFormControl[];

  constructor(name: string, controls: QuestionCustomFormControl[]) {
    super('section');

    this.name = name;
    this.sectionControls = controls;
  }
}

class QuestionCustomFormControl extends CustomFormControl {
  question: string;
  answer: string;

  constructor(question: string, answer: string) {
    super('question');

    this.question = question;
    this.answer = answer;
  }
}

class CustomForm {
  name = '';
  description = '';
  customFormControls: CustomFormControl[] = [];

  setName(name: string): void {
    this.name = name;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  addCustomFormControls(formControls: CustomFormControl): void {
    this.customFormControls.push(formControls);
  }
}

/**
 * Builder Pattern
 */
export class CustomFormBuilder {
  private _form = new CustomForm();

  setName(title: string): CustomFormBuilder {
    this._form.setName(title);
    return this;
  }

  setDescription(description: string): CustomFormBuilder {
    this._form.setDescription(description);
    return this;
  }

  addControl(control: CustomFormControl): CustomFormBuilder {
    this._form.addCustomFormControls(control);
    return this;
  }

  reset(): CustomFormBuilder {
    this._form = new CustomForm();
    return this;
  }

  build(): CustomForm {
    const form = this._form;
    this.reset();

    return form;
  }
}

export class CustomFormTemplateBuilder {
  private builder!: CustomFormBuilder;


  setBuilder(builder: CustomFormBuilder): void {
    this.builder = builder;
  }

  buildContactInformationForm(): void {
    this.builder.setName('Contact information');
    this.builder.setDescription('Small simple contact information');

    const questions = [
      new QuestionCustomFormControl('Your name', ''),
      new QuestionCustomFormControl('Your email', ''),
      new QuestionCustomFormControl('Your address', ''),
      new QuestionCustomFormControl('Your phone number', ''),
    ];

    questions.forEach(question => {
      this.builder.addControl(question);
    });
  }

  buildPartyInviteForm(): void {
    this.builder.setName('Party invite');
    this.builder.setDescription('Just questions');

    const controls = [
      new SectionCustomFormControl('Your info', [
        new QuestionCustomFormControl('Your name', ''),
        new QuestionCustomFormControl('Your phone number', ''),
      ]),
      new QuestionCustomFormControl('Will you come', ''),
      new QuestionCustomFormControl('What time will you arrive', ''),
    ];

    controls.forEach(control => {
      this.builder.addControl(control);
    });
  }
}
