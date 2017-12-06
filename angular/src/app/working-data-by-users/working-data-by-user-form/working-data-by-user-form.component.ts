import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { WorkingDataByUserServiceProxy, WorkingDataByUserDto, PagedResultDtoOfWorkingDataByUserDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'working-data-by-user-form-modal',
  templateUrl: './working-data-by-user-form.component.html'
})
export class WorkingDataByUserFormComponent extends FormComponentBase<WorkingDataByUserDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _workingDataByUserService: WorkingDataByUserServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new WorkingDataByUserDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.phaseId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._workingDataByUserService.get(id)
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
            this._workingDataByUserService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._workingDataByUserService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}