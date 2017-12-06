import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { QuestionnaireQuestionServiceProxy, QuestionnaireQuestionDto, PagedResultDtoOfQuestionnaireQuestionDto } from '@shared/service-proxies/service-proxies';
import { QuestionnaireServiceProxy, QuestionnaireDto, PagedResultDtoOfQuestionnaireDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'questionnaire-question-form-modal',
  templateUrl: './questionnaire-question-form.component.html'
})
export class QuestionnaireQuestionFormComponent extends FormComponentBase<QuestionnaireQuestionDto> implements OnInit, AfterViewInit {
	questionnaireIdList: QuestionnaireDto[] = null;
	
    constructor(
        injector: Injector,
			private _questionnaireQuestionService: QuestionnaireQuestionServiceProxy, 
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
            this.item = new QuestionnaireQuestionDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.questionnaireId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._questionnaireQuestionService.get(id)
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
            this._questionnaireQuestionService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._questionnaireQuestionService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}