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
      title: ['', Validators.required],
      description: ['', Validators.required],
      img: ['', Validators.required],
      link: ['', Validators.required],
      tags: this.formBuilder.array([
        this.createTag(),
      ])
    });
  }

  createTag() {
    return new FormGroup({
      tag: new FormControl(),
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
      console.log(this.cardForm);
    }
  }
}
