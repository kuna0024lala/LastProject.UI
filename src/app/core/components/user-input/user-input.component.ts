import { Component, OnInit } from '@angular/core';
import { UserInputService } from '../services/user-input.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {
  inputNumber: number = 0;
  userInputs: number[] = [];
  errorMessage: string = '';

  constructor (private userInputServices: UserInputService){ }

  ngOnInit(): void {
    this.getUserInputs();
  }

  getUserInputs(): void {
    this.userInputServices.getUserInputs()
      .subscribe({
       next: data => this.userInputs = data.map(input => input.inputNumber),
       error: error => this.errorMessage = error.error
  });
  }

  addUserInput(): void {
    if (isNaN(this.inputNumber) || this.inputNumber % 1 !== 0 || this.inputNumber <= 0) {
      this.errorMessage = "Please enter a valid integer.";
      return;
    }
    if (this.userInputs.includes(this.inputNumber)) {
      this.errorMessage = "Number already exists.";
      return;
    }
    this.userInputServices.addUserInput(this.inputNumber)
      .subscribe({
        next: () => {
          this.userInputs.push(this.inputNumber);
          this.errorMessage = "";
        },
       error: error => this.errorMessage = error.error
   });
  }

  getMultiplicationTable(): string[] {
    if (this.inputNumber == null || isNaN(this.inputNumber) || this.inputNumber % 1 !== 0 || this.inputNumber <= 0) {
      return [];
    }
    const table: string[] = [];
    for (let i = 1; i <= 10; i++) {
      table.push(`${this.inputNumber} x ${i} = ${this.inputNumber * i}`);
    }
    return table;
  }
}
