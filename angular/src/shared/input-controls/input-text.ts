import { Component, Input, Output, ViewChild, forwardRef, OnInit, Injector, ElementRef } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { ValidationServiceProxy, ValidationDto } from "shared/service-proxies/service-proxies";
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { InputComponentBase } from "shared/input-component-base";
const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
};

@Component({
    selector: 'input-text',
    template: `
    <div class="form-group form-float">
        <mat-form-field class="full-width">
            <input matInput [name]="name" [type]="type" [id]="id" [placeholder]="l(placeholder)" [(ngModel)]="value" >
        </mat-form-field>
        <!--
        <div [ngClass]="{error:Model && Model.errors && (Model.dirty || Model.touched)}"  class="form-line">
            <input [id]="id"  [name]="name" [formControl]="Model"  class="form-control" [type]="type" [(ngModel)]="value" />
            <label class="form-label">{{l(placeholder)}}</label>  
        </div>
        -->      
        <div *ngIf="Model">
            <validate  [Model]="Model" [validations]="validationItem" [placeholder]="l(placeholder)"></validate>
        </div>
    </div>
    `,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, ValidationServiceProxy]
})
export class InputComponent extends InputComponentBase {
    @Input() type: string;
    
    ngOnInit(){
        super.ngOnInit();
    }
    constructor(injector: Injector) {
        super(injector);
    }
}


