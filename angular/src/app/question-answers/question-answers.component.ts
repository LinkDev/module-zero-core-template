import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QuestionAnswerDto } from '@shared/service-proxies/service-proxies';
import { QuestionServiceProxy, QuestionDto, PagedResultDtoOfQuestionDto } from '@shared/service-proxies/service-proxies';
import { QuestionAnswerFormComponent } from "app/question-answers/question-answer-form/question-answer-form.component";
import { InlineListComponentBase } from "@shared/inline-list-component-base";

@Component({
	selector: 'question-answer',
    templateUrl: './question-answers.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionServiceProxy,
	]
})
export class QuestionAnswersComponent extends InlineListComponentBase<QuestionAnswerDto> {

    @ViewChild('questionAnswerFormModal') questionAnswerFormModal: QuestionAnswerFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			titleFilter: string;
			isActiveFilter: boolean;
			orderFilter: number;
			questionIdFilter: string;
	questionIdList: QuestionDto[] = null;
			codeFilter: string;
			allowTextFilter: boolean;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
    ) {

        super(injector);
    }

    protected delete(item: QuestionAnswerDto): void {
        abp.message.confirm(
            'Delete Question answer?',
            (result: boolean) => {
                if (result) {
					let index = this.items.findIndex(x => x.id == item.id);
                    this.items.splice(index, 1);
                    abp.notify.info('Deleted Question answer');
                    return;
                }
            }
        );
    }
    // Show Modals
    create(): void {
        this.questionAnswerFormModal.show();
    }

    edit(item: QuestionAnswerDto): void {
		this.questionAnswerFormModal.show(item);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}