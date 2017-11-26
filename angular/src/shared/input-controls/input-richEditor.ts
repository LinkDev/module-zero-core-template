import { Component, Input, Output, forwardRef, Injector,AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor,FormControl } from '@angular/forms';
import * as moment from 'moment';
import { InputComponentBase } from 'shared/input-component-base';
const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RichEditorInput),
    multi: true
};


@Component({
    selector: 'input-richEditor',
    template: `
    <div class="form-group form-float">
        <label>{{placeholder}}</label>
        <div [froalaEditor] [id]="id" [(ngModel)]="value">
        </div>
    </div>
    `,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class RichEditorInput extends InputComponentBase implements AfterViewInit{
    ngAfterViewInit(): void {        
    }

    
    constructor(injector:Injector) {
        super(injector);
    }

    


}


