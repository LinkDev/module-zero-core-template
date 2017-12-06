import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { TrainingResultServiceProxy, TrainingResultDto, PagedResultDtoOfTrainingResultDto } from '@shared/service-proxies/service-proxies';
import { TrainingMemberServiceProxy, TrainingMemberDto, PagedResultDtoOfTrainingMemberDto } from '@shared/service-proxies/service-proxies';
import { TrainingExamServiceProxy, TrainingExamDto, PagedResultDtoOfTrainingExamDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'training-result-form-modal',
  templateUrl: './training-result-form.component.html'
})
export class TrainingResultFormComponent extends FormComponentBase<TrainingResultDto> implements OnInit, AfterViewInit {
	trainingMemberIdList: TrainingMemberDto[] = null;
	trainingExamIdList: TrainingExamDto[] = null;
	
    constructor(
        injector: Injector,
			private _trainingResultService: TrainingResultServiceProxy, 
		private _trainingMemberService: TrainingMemberServiceProxy
, 
		private _trainingExamService: TrainingExamServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new TrainingResultDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.trainingMemberId= '00000000-0000-0000-0000-000000000000';
			this.item.trainingExamId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._trainingResultService.get(id)
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
            this._trainingResultService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._trainingResultService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}