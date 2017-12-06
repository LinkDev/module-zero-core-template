import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { QuestionTemplateValidationRuleServiceProxy, QuestionTemplateValidationRuleDto, PagedResultDtoOfQuestionTemplateValidationRuleDto } from '@shared/service-proxies/service-proxies';
import { QuestionTemplateServiceProxy, QuestionTemplateDto, PagedResultDtoOfQuestionTemplateDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'question-template-validation-rule-form-modal',
  templateUrl: './question-template-validation-rule-form.component.html'
})
export class QuestionTemplateValidationRuleFormComponent extends FormComponentBase<QuestionTemplateValidationRuleDto> implements OnInit, AfterViewInit {
	questionTemplateIdList: QuestionTemplateDto[] = null;
	
    constructor(
        injector: Injector,
			private _questionTemplateValidationRuleService: QuestionTemplateValidationRuleServiceProxy, 
		private _questionTemplateService: QuestionTemplateServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new QuestionTemplateValidationRuleDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.questionTemplateId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._questionTemplateValidationRuleService.get(id)
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
            this._questionTemplateValidationRuleService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._questionTemplateValidationRuleService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}