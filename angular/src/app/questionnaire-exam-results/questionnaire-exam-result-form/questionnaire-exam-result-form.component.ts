import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { QuestionnaireExamResultServiceProxy, QuestionnaireExamResultDto, PagedResultDtoOfQuestionnaireExamResultDto } from '@shared/service-proxies/service-proxies';
import { QuestionnaireServiceProxy, QuestionnaireDto, PagedResultDtoOfQuestionnaireDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'questionnaire-exam-result-form-modal',
  templateUrl: './questionnaire-exam-result-form.component.html'
})
export class QuestionnaireExamResultFormComponent extends FormComponentBase<QuestionnaireExamResultDto> implements OnInit, AfterViewInit {
	questionnaireIdList: QuestionnaireDto[] = null;
	
    constructor(
        injector: Injector,
			private _questionnaireExamResultService: QuestionnaireExamResultServiceProxy, 
		private _questionnaireService: QuestionnaireServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new QuestionnaireExamResultDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.questionnaireId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._questionnaireExamResultService.get(id)
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
            this._questionnaireExamResultService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._questionnaireExamResultService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}