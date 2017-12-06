import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { TrainingMemberServiceProxy, TrainingMemberDto, PagedResultDtoOfTrainingMemberDto } from '@shared/service-proxies/service-proxies';
import { TrainingCenterServiceProxy, TrainingCenterDto, PagedResultDtoOfTrainingCenterDto } from '@shared/service-proxies/service-proxies';
import { TrainingProgramServiceProxy, TrainingProgramDto, PagedResultDtoOfTrainingProgramDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'training-member-form-modal',
  templateUrl: './training-member-form.component.html'
})
export class TrainingMemberFormComponent extends FormComponentBase<TrainingMemberDto> implements OnInit, AfterViewInit {
	trainingCenterIdList: TrainingCenterDto[] = null;
	trainingProgramIdList: TrainingProgramDto[] = null;
	
    constructor(
        injector: Injector,
			private _trainingMemberService: TrainingMemberServiceProxy, 
		private _trainingCenterService: TrainingCenterServiceProxy
, 
		private _trainingProgramService: TrainingProgramServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new TrainingMemberDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.trainingCenterId= '00000000-0000-0000-0000-000000000000';
			this.item.trainingProgramId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._trainingMemberService.get(id)
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
            this._trainingMemberService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._trainingMemberService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}