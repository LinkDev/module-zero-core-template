import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { UserSurveysTemplateServiceProxy, UserSurveysTemplateDto, PagedResultDtoOfUserSurveysTemplateDto } from '@shared/service-proxies/service-proxies';
import { SurveyServiceProxy, SurveyDto, PagedResultDtoOfSurveyDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'user-surveys-template-form-modal',
  templateUrl: './user-surveys-template-form.component.html'
})
export class UserSurveysTemplateFormComponent extends FormComponentBase<UserSurveysTemplateDto> implements OnInit, AfterViewInit {
	surveyIdList: SurveyDto[] = null;
	
    constructor(
        injector: Injector,
			private _userSurveysTemplateService: UserSurveysTemplateServiceProxy, 
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
            this.item = new UserSurveysTemplateDto();
            this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.surveyId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._userSurveysTemplateService.get(id)
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
            this._userSurveysTemplateService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._userSurveysTemplateService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}