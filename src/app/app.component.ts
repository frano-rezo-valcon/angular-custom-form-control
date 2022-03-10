import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular Custom Control Components';

  checkbox0 = false;
  checkbox1 = false;
  checkbox3 = false;
  quantity0 = 1;
  quantity1 = 1;

  form!: FormGroup;

  private _destroy$ = new Subject<void>();

  // get checkbox2(): FormControl {
  //   return this.form.get('checkbox2') as FormControl;
  // }

  // get quantity2(): FormControl {
  //   return this.form.get('quantity2') as FormControl;
  // }

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      checkbox2: [false]
    });

    // this.checkbox2?.valueChanges
    //   .pipe(takeUntil(this._destroy$))
    //   .subscribe(v => console.log('formControl:', v, this.checkbox2?.value));

    // this.quantity2?.valueChanges
    //   .pipe(takeUntil(this._destroy$))
    //   .subscribe(v => console.log('formControl:', v, this.quantity2?.value));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

  // ############ CHECKBOX ############

  onRegularCheckboxChange(isChecked: boolean): void {
    console.log('regular checkbox: ', isChecked, this.checkbox0);
  }

  onNgModelCheckboxChange(isChecked: boolean): void {
    console.log('ngModel checkbox: ', isChecked, this.checkbox1);
  }

  onChange(event: Event): void {
    console.log('change: ', (event.target as HTMLInputElement).checked, this.checkbox1);
  }

  onEmit(isChecked: boolean): void {
    console.log('emit: ', isChecked);
  }

  // ############ QUANTITY ############

  onRegularQuantityChange(quantity: number): void {
    console.log('regular quantity:', quantity);
  }

  onNgModelQuantityChange(quantity: number): void {
    console.log('ngModel quantity:', quantity);
  }
}
