import { Component, Input, Output, forwardRef, OnInit, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor,FormControl } from '@angular/forms';
import { InputComponentBase } from 'shared/input-component-base';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectInput),
    multi: true
};


@Component({
    selector: 'input-select',
    template: `
    <div class="form-group">
        <mat-form-field class="full-width" [ngSwitch]="dataValue">
            <mat-select [formControl]="Model" *ngSwitchCase="''" [multiple]="multiple"  [id]="id"  [placeholder]="placeholder" [(ngModel)]="value">
                <mat-option *ngFor="let item of items" [value]="item">
                    {{item[dataText]}}
                </mat-option>
            </mat-select>
            <mat-select [formControl]="Model" *ngSwitchDefault [multiple]="multiple"  [id]="id"  [placeholder]="placeholder" [(ngModel)]="value">
                <mat-option *ngFor="let item of items" [value]="item[dataValue]">
                    {{item[dataText]}}
                </mat-option>
            </mat-select>
    </mat-form-field>
    <div *ngIf="Model">
        <validate  [Model]="Model" [validations]="validationItem" [placeholder]="l(placeholder)"></validate>
    </div>
  </div>`,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SelectInput extends InputComponentBase{

    @Input() dataValue?: string='';
    @Input() dataText: string;
    @Input() items: any[];
    @Input() proxy: string;
    @Input() multiple: boolean = false;
    constructor(private injector: Injector,_injector: Injector) {
        super(_injector);
    }

    ngOnInit() {
        if (this.proxy !== undefined && this.proxy !== null && this.proxy !== "") {
            let service = this.injector.get(this.proxy);
            service.getAll().subscribe((data) => {
                this.items = data.items;
            });
        }
        super.ngOnInit();
    }



}


