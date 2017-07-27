import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { StudentServiceProxy, StudentDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

import * as _ from "lodash";

@Component({
  selector: 'edit-student-modal',
  templateUrl: './edit-student.component.html'
})
export class EditStudentComponent extends AppComponentBase {

    @ViewChild('editStudentModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;

    item: StudentDto = null;

    constructor(
        injector: Injector,
        private _service: StudentServiceProxy
    ) {
        super(injector);
    }

	show(id:number): void {
        
		this._service.get(id)
			.subscribe(
				(result) => {
					this.item = result;
					this.active = true;
        			this.modal.show();
				}
			);
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        this.saving = true;
        this._service.update(this.item)
            .finally(() => { this.saving = false; })
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}