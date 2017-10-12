import { Component, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';
const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerInput),
    multi: true
};


@Component({
    selector: 'date-picker',
    template: `
    <mat-form-field>
        <input matInput  [matDatepicker]="picker" [name]="name" [id]="id" [min]="min" [max]="max" [placeholder]="placeholder" [(ngModel)]="value">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
    `,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DatePickerInput implements ControlValueAccessor {

    @Input() id: string;
    @Input() name: string;
    @Input() placeholder: string;
    @Input() min: moment.Moment;
    @Input() max: moment.Moment;
    //@Input() required:boolean=false;
    private innerValue: moment.Moment;
    constructor() { }
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value():string {
        if(this.innerValue!=undefined && this.innerValue!=null)
            return this.innerValue.toISOString();
        else 
            return null;
    };

    //set accessor including call the onchange callback
    set value(v:string) {
        if ( (this.innerValue==undefined && this.innerValue==null) ||  v !== this.innerValue.toISOString()) {
            this.innerValue=moment(v);
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }


}


