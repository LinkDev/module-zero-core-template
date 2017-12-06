import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { TrainingCenterUserServiceProxy, TrainingCenterUserDto, PagedResultDtoOfTrainingCenterUserDto } from '@shared/service-proxies/service-proxies';
import { TrainingCenterServiceProxy, TrainingCenterDto, PagedResultDtoOfTrainingCenterDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'training-center-user-form-modal',
  templateUrl: './training-center-user-form.component.html'
})
export class TrainingCenterUserFormComponent extends FormComponentBase<TrainingCenterUserDto> implements OnInit, AfterViewInit {
	trainingCenterIdList: TrainingCenterDto[] = null;
	
    constructor(
        injector: Injector,
			private _trainingCenterUserService: TrainingCenterUserServiceProxy, 
		private _trainingCenterService: TrainingCenterServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new TrainingCenterUserDto();
            this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.trainingCenterId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._trainingCenterUserService.get(id)
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
            this._trainingCenterUserService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._trainingCenterUserService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}