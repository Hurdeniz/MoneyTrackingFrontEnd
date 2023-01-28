import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-collect-money',
  templateUrl: './collect-money.component.html',
  styleUrls: ['./collect-money.component.scss'],
})
export class CollectMoneyComponent implements OnInit {
  answer = 0;
  collectMoneyForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.create();
  }

  create() {
    this.collectMoneyForm = this.formBuilder.group({
      bozuk: [0],
      bes: [0],
      on: [0],
      yirmi: [0],
      elli: [0],
      yuz: [0],
      ikiyuz: [0],
      answer: [0],
    });
  }

  topla() {
    let centralPayModel = Object.assign({}, this.collectMoneyForm.value);

    this.answer =
      centralPayModel.bozuk +
      centralPayModel.bes * 5 +
      centralPayModel.on * 10 +
      centralPayModel.yirmi * 20 +
      centralPayModel.elli * 50 +
      centralPayModel.yuz * 100 +
      centralPayModel.ikiyuz * 200;
    this.collectMoneyForm.controls['answer'].setValue(this.answer);
  }
}
