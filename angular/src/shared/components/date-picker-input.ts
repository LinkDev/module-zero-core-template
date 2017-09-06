﻿import { Component, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerInput),
    multi: true
};


@Component({
    selector: 'date-picker',
    template: `<md-input-container>
  <input mdInput [mdDatepicker]="picker" [name]="name" [id]="id" [min]="min" [max]="max" [placeholder]="placeholder" [(ngModel)]="value">
  <md-datepicker-toggle mdSuffix [for]="picker"></md-datepicker-toggle>
</md-input-container>
<md-datepicker #picker></md-datepicker>`,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DatePickerInput implements ControlValueAccessor {

    @Input() id: string;
    @Input() name: string;
    @Input() placeholder: string;
    @Input() min: Date;
    @Input() max: Date;
    private innerValue: any = '';
    constructor() { }
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
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


