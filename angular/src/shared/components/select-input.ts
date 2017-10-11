import { Component, Input, Output, forwardRef, OnInit, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectInput),
    multi: true
};


@Component({
    selector: 'select-input',
    template: `
    <mat-form-field>
    <mat-select [multiple]="multiple"  [id]="id" class="form-control" [placeholder]="placeholder" [(ngModel)]="val">
    <mat-option *ngFor="let item of items" [value]="item[dataValue]">
        {{item[dataText]}}
    </mat-option>
  </mat-select>
  </mat-form-field>`,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SelectInput implements ControlValueAccessor, OnInit {

    @Input() id: string;
    @Input() name: string;
    @Input() placeholder: string;
    @Input() dataValue: string;
    @Input() dataText: string;
    @Input() items: any[];
    @Input() proxy: string;
    @Input() multiple: boolean = false;
    private innerValue: any = null;
    constructor(private injector: Injector) {

    }

    ngOnInit() {
        if (this.proxy !== undefined && this.proxy !== null && this.proxy !== "") {
            let service = this.injector.get(this.proxy);
            service.getAll().subscribe((data) => {
                this.items = data.items;
            });
        }
    }
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get val(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set val(v: any) {
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


