import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit, ViewChildren, QueryList, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { StudentServiceProxy, StudentDto, PagedResultDtoOfStudentDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { RoleServiceProxy, RoleDto, PagedResultDtoOfRoleDto } from '@shared/service-proxies/service-proxies';

import { FormComponentBase } from '@shared/form-component-base';

import * as _ from "lodash";

@Component({
    selector: 'student-form-modal',
    templateUrl: './student-form.component.html'
})
export class StudentFormComponent extends FormComponentBase<StudentDto> implements OnInit, AfterViewInit {
    parentIdList: StudentDto[] = null;  
    //@Input() parentId: number;
    roles: RoleDto[] = null;
    studentParents: StudentDto[] = null;
    parent: any = {};
    private _parents: any[] = [];
    constructor(
        injector: Injector,
        private _studentService: StudentServiceProxy, private _roleService: RoleServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._roleService.getAll().subscribe((data: PagedResultDtoOfRoleDto) => {
            this.roles = data.items;
        });
        this._studentService.getAll().subscribe((data: PagedResultDtoOfStudentDto) => {
            this.studentParents = data.items;
        });
    }

    show(id?: number): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new StudentDto({
                id: 0,
                isActive: true,
            });
            this.isNew = true;
            this.parent = null;
        }
        else {
            this._studentService.get(id)
                .subscribe(
                (result) => {
                    this.item = result;
                    console.log(this.item);
                    this.active = true;
                    this.modal.show();
                    console.log(this.item);
                    //this.parent = (this.studentParents.find(x => x.id == result.parentId));
                    //if (this.parent != undefined) {
                    //    this._parents = [];
                    //    this.parent.parents = this.getParents(this.parent.parentId);
                    //}
                }
                );
            this.isNew = false;
        }
    }
    save(): void {
        //TODO: Refactor this, don't use jQuery style code
        var roles = [];
        var studentParents = [];

        $(this.modalContent.nativeElement).find("[name=role]").each((ind: number, elem: Element) => {
            if ($(elem).is(":checked") == true) {
                roles.push(elem.getAttribute("value").valueOf());
            }
        });
        this.saving = true;
        if (this.isNew) {
            this._studentService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            //console.log(this.parent.id);
            if (this.parent != undefined)
                this.item.parentId = this.parent.id;
            this._studentService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
    getParents(parentid: number) {
        //debugger;
        if (parentid != null) {
            let _parent = this.studentParents.find(x => x.id == parentid);

            if (_parent != null) {
                this._parents.push(_parent);
                parentid = _parent.parentId;
                this.getParents(_parent.parentId);
            }
            return this._parents;
        }
    }
    blur(input) {
        //var target = event.target || event.srcElement || event.currentTarget;
        console.log(input);
        //console.log($('.form-line:after'));
        //console.log($('#divname:after'));
        //console.log($(input(':after')));
        //input.nativeElement.querySelector(':after').remove();
        //$('#divname:after').css('display', 'none');
        //console.log(input.style);
        
        //input.renderer.setElementStyle(input, 'transform', "scaleX(0)");
    }
    //parentchanged(data) {
    //    //alert("parent");
    //    this.item.parentId = data;
    //    //alert("here" + data);
    //}
}