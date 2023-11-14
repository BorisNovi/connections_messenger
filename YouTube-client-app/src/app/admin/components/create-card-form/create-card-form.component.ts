import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormGroup, FormBuilder, Validators, FormArray, AbstractControl, ValidationErrors
} from '@angular/forms';
import { DateValidatorDirective } from '../../directives/date-validator.directive';

@Component({
  selector: 'app-create-card-form',
  templateUrl: './create-card-form.component.html',
  styleUrls: ['./create-card-form.component.scss']
})
export class CreateCardFormComponent implements OnInit {
  public cardForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cardForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', Validators.maxLength(255)],
      img: ['', Validators.required],
      link: ['', Validators.required],
      date: ['', [Validators.required, this.dateValidator]],
      tags: this.formBuilder.array([
        this.createTag()
      ])
    });
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    return new DateValidatorDirective().validate(control);
  }

  createTag(): FormGroup {
    return new FormGroup({
      tag: new FormControl('', [Validators.required]),
    });
  }

  addTag(): void {
    const arr = (this.cardForm.get('tags') as FormArray);

    if (arr.length >= 5) return;

    arr.push(this.createTag());
  }

  get tags(): FormArray {
    return this.cardForm.get('tags') as FormArray;
  }

  onReset(): void {
    const arr = (this.cardForm.get('tags') as FormArray);

    while (arr.length > 1) {
      arr.removeAt(1);
    }
  }

  onSubmit(): void {
    if (this.cardForm.valid) {
      // eslint-disable-next-line no-console
      console.log(this.cardForm); // Important console log!
    }
  }
}
