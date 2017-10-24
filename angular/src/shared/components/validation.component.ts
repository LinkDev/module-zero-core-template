import { Component, Input, Output, ViewChild, forwardRef, OnInit, Injector, ElementRef, asNativeElements } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import { Validators, ValidatorFn, FormControl } from '@angular/forms';
import { validation, validationTypes } from "shared/interfaces/validation.interface";
import { ValidationDto } from "shared/service-proxies/service-proxies";
@Component({
    selector: 'validate',
    template: `
        <div *ngIf="Model && Model.errors && (Model.dirty || Model.touched)">
            <label [ngClass]="{error: Model.errors.required, hide: !Model.errors.required}">
                {{l(getErrorMsg('required'))}}
            </label>
            <label [ngClass]="{error: Model.errors.maxlength, hide: !Model.errors.maxlength}">
                {{l(getErrorMsg('StringLength'))}}
            </label>
            <label [ngClass]="{error: Model.errors.minlength, hide: !Model.errors.minlength}">
                {{l(getErrorMsg('MinLength'))}}
            </label>
        </div>
    `
})
export class ValidateComponent extends AppComponentBase implements OnInit {
    @Input() id: string;
    @Input() name: string;
    @Input() placeholder: string;
    @Input() Model: FormControl;

    @Input() validations: ValidationDto;
    @Input() proxy: string;


    constructor(private injector: Injector) {
        super(injector);
    }

    ngOnInit() {
    }
    private getErrorMsg(name: string): string {
        let x = this.validations.validationTypes.find(x => x.validationName.toLowerCase() == name.toLowerCase());
        if(x !==undefined && x!==null)
            return  x.errorMessage;
        return "";
    }
    getLength(type: string): number {
        let x = this.validations.validationTypes.find(x => x.validationName == "StringLength");
        if (x !== undefined && x !== null) {
            switch (type) {
                case "min":
                    return x.minLength;
                case "max":
                    return x.maxLength;
                default:
                    break;
            }
        }
    }
}


