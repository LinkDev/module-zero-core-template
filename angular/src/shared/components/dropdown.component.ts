import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild } from "@angular/core";
import { StudentServiceProxy, StudentDto } from "shared/service-proxies/service-proxies";
import { TreeComponent } from "shared/components/tree.component";


@Component({
    selector: 'dropdown',
    template: `<div (clickOutside)="blur()" class="btn-group bootstrap-select form-control">
<button type="button" (click)="clicked()" class="btn dropdown-toggle btn-default"  role="button" >
<span class="filter-option pull-left treeSpan">{{selectedText}}</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button>

<div [hidden]="hideDiv" class="treeDiv"> 
<div class="selectParent" >
<a (click)="selectParentOption();treeRoot.deactivate()" >--Select Parent--</a></div>
 <tree-nodes #treeRoot [proxy]="'StudentServiceProxy'" (selected)="getTreeValues($event)"></tree-nodes> </div>
</div>`
    //    template: `<ng-container *ngTemplateOutlet="greet"></ng-container>
    //    <hr>
    //<ng-template #greet><tree-nodes [proxy]="'StudentServiceProxy'"></tree-nodes></ng-template>

    //      `
})
//[selected]="student.Id == parentId"
export class DropdownComponent {
    @Input() public dropdownValues: StudentDto[] = [];
    @Output() select: EventEmitter<any>;

    hideDiv: boolean = true;
    firstTime: boolean = false;
    default: string = "--Select Parent--";
    selectedText: string = this.default;
    constructor() {
        this.select = new EventEmitter();
    }
   
    selectItem(value) {
        this.select.emit(value);
    }
    clicked() {
        //debugger;
        this.hideDiv = !this.hideDiv;
    }
    blur() {
        //debugger;
        var hidden = $('.treeDiv')[0].hidden;
        if (hidden == false) {
            this.hideDiv = true;
            //$('.treeDiv').hide();
        }
    }
    selectParentOption() {
        //alert("here");
        this.hideDiv = true;
        this.selectedText = this.default;
        this.select.emit(0);
    }
    getTreeValues(data) {
        //alert("Data transfered " + data);
        if (data != "")
        {
            let splitter: string[] = data.split(',');
            if (splitter.length > 0) {
                this.selectedText = splitter[1];
                this.select.emit(splitter[0]);
                this.hideDiv = true;
            }
        }
        else {
            //alert("else");
            this.selectedText = this.default;
            this.select.emit(0);
        }
    }
}