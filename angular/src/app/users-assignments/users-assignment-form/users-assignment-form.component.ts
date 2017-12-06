import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { UsersAssignmentServiceProxy, UsersAssignmentDto, PagedResultDtoOfUsersAssignmentDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'users-assignment-form-modal',
  templateUrl: './users-assignment-form.component.html'
})
export class UsersAssignmentFormComponent extends FormComponentBase<UsersAssignmentDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _usersAssignmentService: UsersAssignmentServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:number): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new UsersAssignmentDto();
			this.item.id= 0;
            this.isNew = true;
        }
        else {
            this._usersAssignmentService.get(id)
                .subscribe(
                (result) => {
                    this.item = result;
                    this.active = true;
                    this.modal.show();
                });
            this.isNew = false;
        }
    }

	save(): void {
        console.log(this.item);
        this.saving = true;

        if (this.isNew) {
            this._usersAssignmentService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._usersAssignmentService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}