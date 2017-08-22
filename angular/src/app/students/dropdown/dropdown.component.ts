import { Component, Input, Output, EventEmitter } from "@angular/core";
import { StudentServiceProxy, StudentDto } from "shared/service-proxies/service-proxies";

export class DropdownValue {
    value: string;
    label: string;

    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }
}

@Component({
    selector: 'dropdown',
    template: `<select id="selectMenu" [ngModel]="selectedParent" class="form-control" (ngModelChange)="selectItem($event)">
                    <option value="">--Select Parent--</option>
                    <option *ngFor="let student of dropdownValues"  value={{student.id}}>{{student.name}}</option>
                </select>`
})
    //[selected]="student.Id == parentId"
export class DropdownComponent {
    @Input() public dropdownValues: StudentDto[] = [];

    @Output() select: EventEmitter<any>;

    constructor() {
        this.select = new EventEmitter();
    }

    selectItem(value) {
        this.select.emit(value);
    }
}