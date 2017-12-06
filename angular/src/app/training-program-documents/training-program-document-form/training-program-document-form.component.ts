import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { TrainingProgramDocumentServiceProxy, TrainingProgramDocumentDto, PagedResultDtoOfTrainingProgramDocumentDto } from '@shared/service-proxies/service-proxies';
import { TrainingProgramServiceProxy, TrainingProgramDto, PagedResultDtoOfTrainingProgramDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'training-program-document-form-modal',
  templateUrl: './training-program-document-form.component.html'
})
export class TrainingProgramDocumentFormComponent extends FormComponentBase<TrainingProgramDocumentDto> implements OnInit, AfterViewInit {
	trainingProgramIdList: TrainingProgramDto[] = null;
	
    constructor(
        injector: Injector,
			private _trainingProgramDocumentService: TrainingProgramDocumentServiceProxy, 
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
            this.item = new TrainingProgramDocumentDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.trainingProgramId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._trainingProgramDocumentService.get(id)
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
            this._trainingProgramDocumentService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._trainingProgramDocumentService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}