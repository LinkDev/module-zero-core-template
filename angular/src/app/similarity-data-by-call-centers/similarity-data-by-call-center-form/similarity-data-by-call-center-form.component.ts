import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { SimilarityDataByCallCenterServiceProxy, SimilarityDataByCallCenterDto, PagedResultDtoOfSimilarityDataByCallCenterDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'similarity-data-by-call-center-form-modal',
  templateUrl: './similarity-data-by-call-center-form.component.html'
})
export class SimilarityDataByCallCenterFormComponent extends FormComponentBase<SimilarityDataByCallCenterDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _similarityDataByCallCenterService: SimilarityDataByCallCenterServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new SimilarityDataByCallCenterDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.domainId= '00000000-0000-0000-0000-000000000000';
			this.item.phaseId= '00000000-0000-0000-0000-000000000000';
			this.item.surveyId= '00000000-0000-0000-0000-000000000000';
			this.item.questionId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._similarityDataByCallCenterService.get(id)
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
            this._similarityDataByCallCenterService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._similarityDataByCallCenterService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}