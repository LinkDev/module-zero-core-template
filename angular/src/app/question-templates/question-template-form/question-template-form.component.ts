import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { QuestionTemplateServiceProxy, QuestionTemplateDto, PagedResultDtoOfQuestionTemplateDto } from '@shared/service-proxies/service-proxies';
import { QuestionTemplateSubCategoryServiceProxy, QuestionTemplateSubCategoryDto, PagedResultDtoOfQuestionTemplateSubCategoryDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'question-template-form-modal',
  templateUrl: './question-template-form.component.html'
})
export class QuestionTemplateFormComponent extends FormComponentBase<QuestionTemplateDto> implements OnInit, AfterViewInit {
	questionTemplateSubCategoryIdList: QuestionTemplateSubCategoryDto[] = null;
	
    constructor(
        injector: Injector,
			private _questionTemplateService: QuestionTemplateServiceProxy, 
		private _questionTemplateSubCategoryService: QuestionTemplateSubCategoryServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new QuestionTemplateDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.questionTemplateSubCategoryId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._questionTemplateService.get(id)
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
            this._questionTemplateService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._questionTemplateService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}