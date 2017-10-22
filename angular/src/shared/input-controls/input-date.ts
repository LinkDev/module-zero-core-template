import { Component, Input, Output, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { InputComponentBase } from 'shared/input-component-base';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerInput),
    multi: true
};

@Component({
    selector: 'input-date',
    template: `
    <div class='form-group'>
        <mat-form-field class="full-width" >
            <input matInput [formControl]="Model" [matDatepicker]="picker" [name]="name" [id]="id" [min]="min" [max]="max" [placeholder]="l(placeholder)" [(ngModel)]="value">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <div *ngIf="Model">
            <validate  [Model]="Model" [validations]="validationItem" [placeholder]="l(placeholder)"></validate>
        </div>
    </div>
    `,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DatePickerInput extends InputComponentBase {

    @Input() min: moment.Moment;
    @Input() max: moment.Moment;
    //@Input() required:boolean=false;
    constructor(injector: Injector) {
        super(injector);
    }
    ngOnInit() {
        super.ngOnInit()
    }
    //get accessor
    get value() {
        if (this.innerValue != undefined && this.innerValue != null)
            return this.innerValue.toISOString();
        else
            return null;
    };

    //set accessor including call the onchange callback
    set value(v) {
        if(v===undefined)
            this.innerValue = moment(null);
        else if ((this.innerValue == undefined && this.innerValue == null) || v !== this.innerValue.toISOString()) {
            this.innerValue = moment(v);
            this.onChangeCallback(v);
        }
    }
}


