import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  quantity1 = 1;
  form!: FormGroup;

  private _checkbox1 = this.checkbox1;
  private _destroy$ = new Subject<void>();

  get checkbox2(): FormControl {
    return this.form.get('checkbox2') as FormControl;
  }

  get quantity2(): FormControl {
    return this.form.get('quantity2') as FormControl;
  }

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      checkbox2: [false],
      quantity2: [1]
    });

    this.checkbox2?.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(v => console.log('formControl:', v, this.checkbox2?.value));

    this.quantity2?.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(v => console.log('formControl:', v, this.quantity2?.value));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

  onRegularCheckboxChange(isChecked: boolean): void {
    console.log('regular: ', isChecked, this.checkbox0);
  }

  onNgModelCheckboxChange(isChecked: boolean): void {
    console.log('ngModel: ', isChecked, this.checkbox1, this._checkbox1);
    if (isChecked !== this._checkbox1) {
      console.log('...is triggered...');
      this._checkbox1 = isChecked;
      // ...do some magic
    }
  }

  onChange(event: Event): void {
    console.log('change: ', (event.target as HTMLInputElement).checked, this.checkbox1);
  }

  onEmit(isChecked: boolean): void {
    console.log('emit: ', isChecked);
  }

  onNgModelQuantityChange(quantity: number): void {
    console.log('ngModel quantity:', quantity);
  }
}
