import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { PhaseSurveyServiceProxy, PhaseSurveyDto, PagedResultDtoOfPhaseSurveyDto } from '@shared/service-proxies/service-proxies';
import { PhaseServiceProxy, PhaseDto, PagedResultDtoOfPhaseDto } from '@shared/service-proxies/service-proxies';
import { SurveyServiceProxy, SurveyDto, PagedResultDtoOfSurveyDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'phase-survey-form-modal',
  templateUrl: './phase-survey-form.component.html'
})
export class PhaseSurveyFormComponent extends FormComponentBase<PhaseSurveyDto> implements OnInit, AfterViewInit {
	phaseIdList: PhaseDto[] = null;
	surveyIdList: SurveyDto[] = null;
	
    constructor(
        injector: Injector,
			private _phaseSurveyService: PhaseSurveyServiceProxy, 
		private _phaseService: PhaseServiceProxy
, 
		private _surveyService: SurveyServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new PhaseSurveyDto();
            this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.phaseId= '00000000-0000-0000-0000-000000000000';
			this.item.surveyId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._phaseSurveyService.get(id)
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
            this._phaseSurveyService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._phaseSurveyService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}