import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { ValidationRuleDto } from '@shared/service-proxies/service-proxies';
import { QuestionServiceProxy, QuestionDto, PagedResultDtoOfQuestionDto } from '@shared/service-proxies/service-proxies';
import { InlineFormComponentBase } from '@shared/inline-form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'validation-rule-form-modal',
  templateUrl: './validation-rule-form.component.html'
})
export class ValidationRuleFormComponent extends InlineFormComponentBase<ValidationRuleDto> implements OnInit, AfterViewInit {
	questionIdList: QuestionDto[] = null;
	
    constructor(
        injector: Injector, 
		private _questionService: QuestionServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

    show(data?: ValidationRuleDto): void {
        if (!data) {
            this.active = true;
            this.modal.show();
            this.item = new ValidationRuleDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.isActive= true;
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