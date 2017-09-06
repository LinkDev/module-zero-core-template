import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { QuestionGroupServiceProxy, QuestionGroupDto, PagedResultDtoOfQuestionGroupDto } from '@shared/service-proxies/service-proxies';
import { SurveyServiceProxy, SurveyDto, PagedResultDtoOfSurveyDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'question-group-form-modal',
  templateUrl: './question-group-form.component.html'
})
export class QuestionGroupFormComponent extends FormComponentBase<QuestionGroupDto> implements OnInit, AfterViewInit {
	surveyIdList: SurveyDto[] = null;
	
    constructor(
        injector: Injector,
			private _questionGroupService: QuestionGroupServiceProxy, 
		private _surveyService: SurveyServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {
        this._surveyService.getAll().subscribe((data: PagedResultDtoOfSurveyDto) => {
            this.surveyIdList = data.items;
        });
    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new QuestionGroupDto({
				questionGroupId: '00000000-0000-0000-0000-000000000000',
				isActive: true,
				surveyId: '00000000-0000-0000-0000-000000000000',
            });
            this.isNew = true;
        }
        else {
            this._questionGroupService.get(id)
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
            this._questionGroupService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._questionGroupService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}