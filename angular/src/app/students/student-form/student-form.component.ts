import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { StudentServiceProxy, StudentDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { RoleServiceProxy, RoleDto,PagedResultDtoOfRoleDto } from '@shared/service-proxies/service-proxies';

import * as _ from "lodash";

@Component({
    selector: 'student-form-modal',
    templateUrl: './student-form.component.html'
})
export class StudentFormComponent extends AppComponentBase implements OnInit, AfterViewInit {

    @ViewChild('studentFormModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;
    item: StudentDto = null;
    isNew: boolean = true;
    roles: RoleDto[] = null;

    @ViewChildren("options")
    options: QueryList<any>;

    constructor(
        injector: Injector,
        private _studentService: StudentServiceProxy, private _roleService:RoleServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._roleService.getAll(0, 1000).subscribe((data: PagedResultDtoOfRoleDto) => {
            this.roles = data.items;
        });
    }

    ngAfterViewInit() {
        this.options.changes.subscribe(() => {
            //(<any>$(this.select.nativeElement)).selectpicker('refresh');
            //Or
            (<any>$("select")).selectpicker('refresh');
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
        }
        else {
            this._studentService.get(id)
                .subscribe(
                (result) => {
                    this.item = result;
                    this.active = true;
                    this.modal.show();
                    
                }
                );
            this.isNew = false;
        }
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
        $('form').find('input[type=text],textarea,select').filter(':visible:first').focus();
    }

    save(): void {
        //TODO: Refactor this, don't use jQuery style code
        var roles = [];
        $(this.modalContent.nativeElement).find("[name=role]").each((ind: number, elem: Element) => {
            if ($(elem).is(":checked") == true) {
                roles.push(elem.getAttribute("value").valueOf());
            }
        });

        console.log(this.item);
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
            this._studentService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}