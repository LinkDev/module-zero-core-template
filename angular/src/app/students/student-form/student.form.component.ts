import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { StudentServiceProxy, StudentDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import * as _ from "lodash";

@Component({
    selector: 'student-form-modal',
    templateUrl: './student.form.component.html'
})
export class StudentFormComponent extends AppComponentBase implements OnInit {

    @ViewChild('createStudentModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;
    item: StudentDto = null;
    isNew: boolean = true;
    constructor(
        injector: Injector,
        private _studentService: StudentServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {

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
    }

    save(): void {
        //TODO: Refactor this, don't use jQuery style code
        var roles = [];
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