import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, forwardRef } from "@angular/core";
import { TreeComponent } from "shared/components/tree.component";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
};

@Component({
    selector: 'dropdown',
    template: `<div (clickOutside)="blur()" class="btn-group bootstrap-select form-control">
<button type="button" (click)="clicked()" class="btn dropdown-toggle btn-default"  role="button" >
<span class="filter-option pull-left treeSpan">{{selectedText}}</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button>

<div [hidden]="hideDiv" class="treeDiv"> 
<div class="selectParent" >
<a (click)="selectParentOption();treeRoot.deactivate()" >--Select Parent--</a></div>
 <tree-nodes #treeRoot [proxy]="proxy" [multiselect]="multiselect" (selected)="SetModelValue($event);" [selectedValues]="innerValue" ngDefaultControl [(ngModel)]="value" [name]="name" ></tree-nodes> </div>
</div>`, providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
//[selected]="student.Id == parentId"
export class DropdownComponent implements ControlValueAccessor {
    @Input() public dropdownValues: any[] = [];
    @Input() multiselect: boolean = false;
    @Input() name: string;
    @Input() proxy: string;
    @Output() selectcted: EventEmitter<any>;

    private innerValue: any = null;
    hideDiv: boolean = true;
    firstTime: boolean = false;
    default: string = "--Select Parent--";
    selectedText: string = this.default;
    private _selectedIds: any[] = [];
    //selectedIds: any[] = [];

    set selectedIds(val: any) {
        if (val == null) {
            this._selectedIds = [];
            this.selectedText = this.default;
            if (!this.multiselect)
                this.hideDiv = true;
            this.writeValue(val);
        }
        else {
            let exists = this._selectedIds.find(x => x.id === val.id);
            if (exists == undefined) {
                this._selectedIds.push(val);
                let names = this._selectedIds.map(function(a) { return a["name"]; });
                this.selectedText = names.join(',');

                if (!this.multiselect)
                    this.hideDiv = true;
                this.writeValue(val);
            }
        }
    }

    get selectedIds(): any { return this._selectedIds; }

    constructor() {
        this.selectcted = new EventEmitter();
        this._selectedIds = [];
    }

    clicked() {
        //console.log("chlicked");
        //debugger;
        this.hideDiv = !this.hideDiv;
    }
    blur() {
        //console.log("blur");
        //alert("here");
        var hidden = $('.treeDiv')[0].hidden;
        if (hidden == false) {
            this.hideDiv = true;
        }
    }
    selectParentOption() {
        this.selectedIds = null;
    }
    SetModelValue(data) {
        //alert("Data transfered " + data);
        this._selectedIds = [];
        this.selectedIds = data;
    }

    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value(): any {
        //console.log(this.innerValue);
        return this.innerValue;
    };
    //set accessor including call the onchange callback
    set value(v: any) {
        //console.log("drop down set value");
        //console.log(v);
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
            this.selectedIds = v != null ? v : null;
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.value = value;
            this.innerValue = value;
            //this.selectedIds = value != null ? value : null;
            //this.value = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
        console.log("dropdown");
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}