import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QuestionnaireQuestionAnswerServiceProxy, QuestionnaireQuestionAnswerDto, PagedResultDtoOfQuestionnaireQuestionAnswerDto } from '@shared/service-proxies/service-proxies';
import { QuestionnaireQuestionServiceProxy, QuestionnaireQuestionDto, PagedResultDtoOfQuestionnaireQuestionDto } from '@shared/service-proxies/service-proxies';
import { QuestionnaireQuestionAnswerFormComponent } from "app/questionnaire-question-answers/questionnaire-question-answer-form/questionnaire-question-answer-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'questionnaire-question-answer',
    templateUrl: './questionnaire-question-answers.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionnaireQuestionAnswerServiceProxy,
		QuestionnaireQuestionServiceProxy,
	]
})
export class QuestionnaireQuestionAnswersComponent extends FilteredComponentBase<QuestionnaireQuestionAnswerDto> {
	items: QuestionnaireQuestionAnswerDto[] = [];

    @ViewChild('questionnaireQuestionAnswerFormModal') questionnaireQuestionAnswerFormModal: QuestionnaireQuestionAnswerFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			titleFilter: string;
			questionIdFilter: string;
	questionIdList: QuestionnaireQuestionDto[] = null;
			isTrueFilter: boolean;
			orderFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _questionnaireQuestionAnswerService: QuestionnaireQuestionAnswerServiceProxy
			, private _questionnaireQuestionService: QuestionnaireQuestionServiceProxy
    ) {

        super(injector);
    }

    
	ngOnInit() {

		this.activatedRoute.queryParams.subscribe((params: Params) => {
            let key = params['key'];
            let value = params['value'];
            this[key + "Filter"] = value;
            this.search();
        });

        super.ngOnInit();
    }


    protected list(request: FilteredResultRequestDto, pageNumber: number, finishedCallback: Function): void {
			this._questionnaireQuestionAnswerService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQuestionnaireQuestionAnswerDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QuestionnaireQuestionAnswerDto): void {
        abp.message.confirm(
            'Delete Questionnaire question answer?',
            (result: boolean) => {
                if (result) {
                    this._questionnaireQuestionAnswerService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Questionnaire question answer: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.titleFilter !== undefined && this.titleFilter !== null && this.titleFilter.toString() !== '')
        items.push({ FilterName: "Title", FilterType: FilterType.like, FilterValue: this.titleFilter });
						        if (this.questionIdFilter !== undefined && this.questionIdFilter !== null && this.questionIdFilter.toString() !== '')
		items.push({ FilterName: "QuestionId", FilterType: FilterType.in, FilterValue: this.questionIdFilter });
				        if (this.isTrueFilter !== undefined && this.isTrueFilter !== null && this.isTrueFilter.toString() !== '')
		items.push({ FilterName: "IsTrue", FilterType: FilterType.eq, FilterValue: this.isTrueFilter });
				        if (this.orderFilter !== undefined && this.orderFilter !== null && this.orderFilter.toString() !== '')
		items.push({ FilterName: "Order", FilterType: FilterType.eq, FilterValue: this.orderFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.questionnaireQuestionAnswerFormModal.show();
    }

    edit(item: QuestionnaireQuestionAnswerDto): void {
        this.questionnaireQuestionAnswerFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}