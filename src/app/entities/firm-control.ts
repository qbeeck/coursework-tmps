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

export class CustomForm {
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

  buildEmptyForm(): void {
    this.builder.setName('New Form');
    this.builder.setDescription('New Description');

    const questions = [
      new QuestionCustomFormControl('Example', ''),
    ];

    questions.forEach(question => {
      this.builder.addControl(question);
    });
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


/**
 * Factory method pattern
 */
export interface FormCreator {
  factoryMethod(): CustomForm;
}

export class EmptyFormCreator implements FormCreator {
  factoryMethod(): CustomForm {
    const builder = new CustomFormBuilder();
    const templateBuilder = new CustomFormTemplateBuilder();

    templateBuilder.setBuilder(builder);
    templateBuilder.buildEmptyForm();

    return builder.build();
  }
}

export class ContactInformationFormCreator implements FormCreator {
  factoryMethod(): CustomForm {
    const builder = new CustomFormBuilder();
    const templateBuilder = new CustomFormTemplateBuilder();

    templateBuilder.setBuilder(builder);
    templateBuilder.buildContactInformationForm();

    return builder.build();
  }
}

export class PartyInviteFormCreator implements FormCreator {
  factoryMethod(): CustomForm {
    const builder = new CustomFormBuilder();
    const templateBuilder = new CustomFormTemplateBuilder();

    templateBuilder.setBuilder(builder);
    templateBuilder.buildPartyInviteForm();

    return builder.build();
  }
}

