import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { QuestionTemplateSubCategoryServiceProxy, QuestionTemplateSubCategoryDto, PagedResultDtoOfQuestionTemplateSubCategoryDto } from '@shared/service-proxies/service-proxies';
import { QuestionTemplateCategoryServiceProxy, QuestionTemplateCategoryDto, PagedResultDtoOfQuestionTemplateCategoryDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'question-template-sub-category-form-modal',
  templateUrl: './question-template-sub-category-form.component.html'
})
export class QuestionTemplateSubCategoryFormComponent extends FormComponentBase<QuestionTemplateSubCategoryDto> implements OnInit, AfterViewInit {
	questionTemplateCategoryIdList: QuestionTemplateCategoryDto[] = null;
	
    constructor(
        injector: Injector,
			private _questionTemplateSubCategoryService: QuestionTemplateSubCategoryServiceProxy, 
		private _questionTemplateCategoryService: QuestionTemplateCategoryServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new QuestionTemplateSubCategoryDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.questionTemplateCategoryId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._questionTemplateSubCategoryService.get(id)
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
            this._questionTemplateSubCategoryService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._questionTemplateSubCategoryService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}