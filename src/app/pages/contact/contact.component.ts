import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { FakeMailerService } from 'src/app/services/fake-mailer.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild(MatAutocomplete) autocomplete!: MatAutocomplete;

  drivers: string[];
  filteredDrivers?: Observable<string[]>;
  contactForm!: FormGroup;

  constructor(private route: ActivatedRoute, private fakeMailer: FakeMailerService, private snackBar: MatSnackBar) {
    this.drivers = route.snapshot.data['drivers'].sort();
  }

  driverValidator: ValidatorFn = (control: AbstractControl) => {
    return this.drivers.includes(control.value) ? null : { error: "sure" };
  };

  ngOnInit() {

    this.contactForm = new FormGroup({
      driver: new FormControl('', this.driverValidator),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });

    this.filteredDrivers = this.contactForm.get('driver')?.valueChanges.pipe(
      startWith(''),
      map(value => this.drivers
        .filter(driver => driver.toLowerCase().includes(value?.toLowerCase() ?? '')),
      ));
  }

  sendMessage() {
    const { driver, subject, message } = this.contactForm.value;
    this.fakeMailer.sendEmail(driver, subject, message).subscribe({
      next: () => {
        //not gonna happen
      },
      error: () => {
        // everything just fine;
        this.snackBar.open(`${driver} says hello!`, "DISMISS", { duration: 3000 });
      }
    })
  }
}
