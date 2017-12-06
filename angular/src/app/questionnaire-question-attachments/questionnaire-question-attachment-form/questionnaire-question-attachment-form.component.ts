import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { QuestionnaireQuestionAttachmentServiceProxy, QuestionnaireQuestionAttachmentDto, PagedResultDtoOfQuestionnaireQuestionAttachmentDto } from '@shared/service-proxies/service-proxies';
import { QuestionnaireQuestionServiceProxy, QuestionnaireQuestionDto, PagedResultDtoOfQuestionnaireQuestionDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'questionnaire-question-attachment-form-modal',
  templateUrl: './questionnaire-question-attachment-form.component.html'
})
export class QuestionnaireQuestionAttachmentFormComponent extends FormComponentBase<QuestionnaireQuestionAttachmentDto> implements OnInit, AfterViewInit {
	questionIdList: QuestionnaireQuestionDto[] = null;
	
    constructor(
        injector: Injector,
			private _questionnaireQuestionAttachmentService: QuestionnaireQuestionAttachmentServiceProxy, 
		private _questionnaireQuestionService: QuestionnaireQuestionServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new QuestionnaireQuestionAttachmentDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.questionId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._questionnaireQuestionAttachmentService.get(id)
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
            this._questionnaireQuestionAttachmentService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._questionnaireQuestionAttachmentService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}