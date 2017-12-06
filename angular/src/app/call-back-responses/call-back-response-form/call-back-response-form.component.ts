import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { CallBackResponseServiceProxy, CallBackResponseDto, PagedResultDtoOfCallBackResponseDto } from '@shared/service-proxies/service-proxies';
import { SurveyServiceProxy, SurveyDto, PagedResultDtoOfSurveyDto } from '@shared/service-proxies/service-proxies';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { PhaseServiceProxy, PhaseDto, PagedResultDtoOfPhaseDto } from '@shared/service-proxies/service-proxies';
import { SampleServiceProxy, SampleDto, PagedResultDtoOfSampleDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'call-back-response-form-modal',
  templateUrl: './call-back-response-form.component.html'
})
export class CallBackResponseFormComponent extends FormComponentBase<CallBackResponseDto> implements OnInit, AfterViewInit {
	surveyIdList: SurveyDto[] = null;
	domainIdList: DomainDto[] = null;
	phaseIdList: PhaseDto[] = null;
	sampleIDList: SampleDto[] = null;
	cbParentResponseIdList: CallBackResponseDto[] = null;
	
    constructor(
        injector: Injector,
			private _callBackResponseService: CallBackResponseServiceProxy, 
		private _surveyService: SurveyServiceProxy
, 
		private _domainService: DomainServiceProxy
, 
		private _phaseService: PhaseServiceProxy
, 
		private _sampleService: SampleServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new CallBackResponseDto();
			this.item.id= '00000000-0000-0000-0000-000000000000';
			this.item.responseId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._callBackResponseService.get(id)
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
            this._callBackResponseService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._callBackResponseService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}