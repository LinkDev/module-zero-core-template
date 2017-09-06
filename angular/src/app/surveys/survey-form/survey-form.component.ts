import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SurveyServiceProxy, SurveyDto, PagedResultDtoOfSurveyDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'survey-form-modal',
  templateUrl: './survey-form.component.html'
})
export class SurveyFormComponent extends FormComponentBase<SurveyDto> implements OnInit, AfterViewInit {
	parentSurveyIdList: SurveyDto[] = null;
	
    constructor(
        injector: Injector,
			private _surveyService: SurveyServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {
    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new SurveyDto({
				surveyId: '00000000-0000-0000-0000-000000000000',
				isActive: true,
            });
            this.isNew = true;
        }
        else {
            this._surveyService.get(id)
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
            this._surveyService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._surveyService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}