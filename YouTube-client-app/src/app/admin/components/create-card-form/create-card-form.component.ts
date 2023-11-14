import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormGroup, FormBuilder, Validators, FormArray
} from '@angular/forms';

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
      date: ['', [Validators.required]],
      tags: this.formBuilder.array([
        this.createTag()
      ])
    });
  }

  createTag(): FormControl {
    return new FormControl('', [Validators.required]);
  }

  addTag(): void {
    const arr = this.cardForm.get('tags') as FormArray;

    if (arr.length >= 5) return;

    arr.push(this.createTag());
  }

  removeTag(i: number): void {
    const arr = (this.cardForm.get('tags') as FormArray);

    if (arr.length <= 1) return;

    arr.removeAt(i);
  }

  get tags(): FormArray<FormControl> {
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
