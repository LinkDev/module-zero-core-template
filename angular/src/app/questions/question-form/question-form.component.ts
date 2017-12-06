import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { QuestionServiceProxy, QuestionDto, PagedResultDtoOfQuestionDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupServiceProxy, DomainGroupDto, PagedResultDtoOfDomainGroupDto } from '@shared/service-proxies/service-proxies';
import { QuestionGroupServiceProxy, QuestionGroupDto, PagedResultDtoOfQuestionGroupDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'question-form-modal',
  templateUrl: './question-form.component.html'
})
export class QuestionFormComponent extends FormComponentBase<QuestionDto> implements OnInit, AfterViewInit {
	domainGroupIdList: DomainGroupDto[] = null;
	questionGroupIdList: QuestionGroupDto[] = null;
	
    constructor(
        injector: Injector,
			private _questionService: QuestionServiceProxy, 
		private _domainGroupService: DomainGroupServiceProxy
, 
		private _questionGroupService: QuestionGroupServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new QuestionDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.isActive= true;
			this.item.questionGroupId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._questionService.get(id)
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
		//this.item.questionAnswers.forEach(x => x.questionId = this.item.id);
		//this.item.validationRules.forEach(x => x.questionId = this.item.id);

        if (this.isNew) {
            this._questionService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._questionService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}