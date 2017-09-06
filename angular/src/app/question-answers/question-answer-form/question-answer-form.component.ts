import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { QuestionAnswerDto } from '@shared/service-proxies/service-proxies';
import { QuestionServiceProxy, QuestionDto, PagedResultDtoOfQuestionDto } from '@shared/service-proxies/service-proxies';
import { InlineFormComponentBase } from '@shared/inline-form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'question-answer-form-modal',
  templateUrl: './question-answer-form.component.html'
})
export class QuestionAnswerFormComponent extends InlineFormComponentBase<QuestionAnswerDto> implements OnInit, AfterViewInit {
	questionIdList: QuestionDto[] = null;
	
    constructor(
        injector: Injector, 
		private _questionService: QuestionServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {
        this._questionService.getAll().subscribe((data: PagedResultDtoOfQuestionDto) => {
            this.questionIdList = data.items;
        });
    }

    show(data?: QuestionAnswerDto): void {
        if (!data) {
            this.active = true;
            this.modal.show();
            this.item = new QuestionAnswerDto({
				questionAnswerId: '00000000-0000-0000-0000-000000000000',
				isActive: true,
				questionId: '00000000-0000-0000-0000-000000000000',
            });
            this.isNew = true;
        }
        else {
			this.item = data.clone();
            this.itemTemp = data;
            this.active = true;
            this.modal.show();
            this.isNew = false;
        }
    }

	save(): void {
        console.log(this.item);
        this.saving = true;

		if (this.isNew) {
            this.saveItem.emit(this.item);
        }
        else {
            for (var p in this.item) this.itemTemp[p] = this.item[p];
        }
		this.saving = false;
		this.close();
    }
}