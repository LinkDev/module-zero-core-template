import { Component, Input, Output, ViewChild, forwardRef, OnInit, Injector, ElementRef } from '@angular/core';
import { AppComponentBase } from 'shared/app-component-base';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, Validators, ValidatorFn, FormControl,FormControlName } from '@angular/forms';
import { ValidationServiceProxy, ValidationDto } from "shared/service-proxies/service-proxies";
import { Observable,ReplaySubject } from 'rxjs';
import * as moment from 'moment';
const noop = () => {
};


export class InputComponentBase extends AppComponentBase implements OnInit,ControlValueAccessor {
    
    Model: FormControl=new FormControl();
    
    @Input() placeholder: string;
    @Input() name: string;
    @Input() id: string;
    @Input() dto: string;
    protected static innerDto: string;
    private static validations: ReplaySubject<ValidationDto[]>=new ReplaySubject<ValidationDto[]>(1);
    validationItem: ValidationDto;
    protected innerValue: any;
    protected _validationService: ValidationServiceProxy;
    constructor(injector: Injector) {
        super(injector);
        this._validationService = injector.get(ValidationServiceProxy);
    }

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

    ngOnInit() {
        
        if (this.dto !== undefined && this.dto !== null && this.dto !== '') {
            if (this.dto !== InputComponentBase.innerDto) {
                InputComponentBase.innerDto = this.dto;
                this._validationService.getValidations(this.dto).subscribe(data=>InputComponentBase.validations.next(data));
                InputComponentBase.validations.subscribe((data) => {
                    this.validationItem = data.find(x => x.name.toLowerCase() == this.name.toLowerCase());
                    this.setValidation();
                });
            }
            else {
                InputComponentBase.validations.subscribe((data) => {
                    this.validationItem = data.find(x => x.name.toLowerCase() == this.name.toLowerCase());
                    this.setValidation();
                });
            }
        }
        else{
            this.Model = new FormControl(this.innerValue);
        }
    }
    protected setValidation() {
        this.placeholder = this.validationItem.displayName;
        let validations: ValidatorFn[] = [];
        if (this.validationItem !== undefined && this.validationItem !== null && this.validationItem.validationTypes!==undefined ) {
            this.validationItem.validationTypes.forEach(element => {
                switch (element.validationName) {
                    case "Required":
                        validations.push(Validators.required);
                        break;
                    case "StringLength":
                        validations.push(Validators.minLength(element.minLength));
                        validations.push(Validators.maxLength(element.maxLength));
                        break;
                    case "MaxLength":
                        validations.push(Validators.maxLength(element.maxLength));
                    case "MinLength":
                        validations.push(Validators.maxLength(element.minLength));
                    default:
                        break;
                }

            });
        }
        this.Model = new FormControl(this.value, validations);
    }


    
    //set accessor including call the onchange callback

    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;
 

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.value = value;
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