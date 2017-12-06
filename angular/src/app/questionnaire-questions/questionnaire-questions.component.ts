import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QuestionnaireQuestionServiceProxy, QuestionnaireQuestionDto, PagedResultDtoOfQuestionnaireQuestionDto } from '@shared/service-proxies/service-proxies';
import { QuestionnaireServiceProxy, QuestionnaireDto, PagedResultDtoOfQuestionnaireDto } from '@shared/service-proxies/service-proxies';
import { QuestionnaireQuestionFormComponent } from "app/questionnaire-questions/questionnaire-question-form/questionnaire-question-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'questionnaire-question',
    templateUrl: './questionnaire-questions.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionnaireQuestionServiceProxy,
		QuestionnaireServiceProxy,
	]
})
export class QuestionnaireQuestionsComponent extends FilteredComponentBase<QuestionnaireQuestionDto> {
	items: QuestionnaireQuestionDto[] = [];

    @ViewChild('questionnaireQuestionFormModal') questionnaireQuestionFormModal: QuestionnaireQuestionFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			titleFilter: string;
			briefFilter: string;
			questionnaireIdFilter: string;
	questionnaireIdList: QuestionnaireDto[] = null;
			answerTypeFilter: number;
			scoreFilter: number;
			orderFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _questionnaireQuestionService: QuestionnaireQuestionServiceProxy
			, private _questionnaireService: QuestionnaireServiceProxy
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
			this._questionnaireQuestionService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQuestionnaireQuestionDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QuestionnaireQuestionDto): void {
        abp.message.confirm(
            'Delete Questionnaire question?',
            (result: boolean) => {
                if (result) {
                    this._questionnaireQuestionService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Questionnaire question: ' + item.id);
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
						        if (this.briefFilter !== undefined && this.briefFilter !== null && this.briefFilter.toString() !== '')
        items.push({ FilterName: "Brief", FilterType: FilterType.like, FilterValue: this.briefFilter });
						        if (this.questionnaireIdFilter !== undefined && this.questionnaireIdFilter !== null && this.questionnaireIdFilter.toString() !== '')
		items.push({ FilterName: "QuestionnaireId", FilterType: FilterType.in, FilterValue: this.questionnaireIdFilter });
				        if (this.answerTypeFilter !== undefined && this.answerTypeFilter !== null && this.answerTypeFilter.toString() !== '')
		items.push({ FilterName: "AnswerType", FilterType: FilterType.eq, FilterValue: this.answerTypeFilter });
				        if (this.scoreFilter !== undefined && this.scoreFilter !== null && this.scoreFilter.toString() !== '')
		items.push({ FilterName: "Score", FilterType: FilterType.eq, FilterValue: this.scoreFilter });
				        if (this.orderFilter !== undefined && this.orderFilter !== null && this.orderFilter.toString() !== '')
		items.push({ FilterName: "Order", FilterType: FilterType.eq, FilterValue: this.orderFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.questionnaireQuestionFormModal.show();
    }

    edit(item: QuestionnaireQuestionDto): void {
        this.questionnaireQuestionFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}