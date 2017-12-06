import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QuestionnaireExamResultServiceProxy, QuestionnaireExamResultDto, PagedResultDtoOfQuestionnaireExamResultDto } from '@shared/service-proxies/service-proxies';
import { QuestionnaireServiceProxy, QuestionnaireDto, PagedResultDtoOfQuestionnaireDto } from '@shared/service-proxies/service-proxies';
import { QuestionnaireExamResultFormComponent } from "app/questionnaire-exam-results/questionnaire-exam-result-form/questionnaire-exam-result-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'questionnaire-exam-result',
    templateUrl: './questionnaire-exam-results.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionnaireExamResultServiceProxy,
		QuestionnaireServiceProxy,
	]
})
export class QuestionnaireExamResultsComponent extends FilteredComponentBase<QuestionnaireExamResultDto> {
	items: QuestionnaireExamResultDto[] = [];

    @ViewChild('questionnaireExamResultFormModal') questionnaireExamResultFormModal: QuestionnaireExamResultFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			userIdFilter: string;
			questionnaireIdFilter: string;
	questionnaireIdList: QuestionnaireDto[] = null;
			userScoreFilter: number;
			totalScoreFilter: number;
			submitDateFromFilter: moment.Moment=null;
	submitDateToFilter: moment.Moment=null;
		constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _questionnaireExamResultService: QuestionnaireExamResultServiceProxy
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
			this._questionnaireExamResultService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQuestionnaireExamResultDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QuestionnaireExamResultDto): void {
        abp.message.confirm(
            'Delete Questionnaire exam result?',
            (result: boolean) => {
                if (result) {
                    this._questionnaireExamResultService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Questionnaire exam result: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.userIdFilter !== undefined && this.userIdFilter !== null && this.userIdFilter.toString() !== '')
        items.push({ FilterName: "UserId", FilterType: FilterType.like, FilterValue: this.userIdFilter });
						        if (this.questionnaireIdFilter !== undefined && this.questionnaireIdFilter !== null && this.questionnaireIdFilter.toString() !== '')
		items.push({ FilterName: "QuestionnaireId", FilterType: FilterType.in, FilterValue: this.questionnaireIdFilter });
				        if (this.userScoreFilter !== undefined && this.userScoreFilter !== null && this.userScoreFilter.toString() !== '')
		items.push({ FilterName: "UserScore", FilterType: FilterType.eq, FilterValue: this.userScoreFilter });
				        if (this.totalScoreFilter !== undefined && this.totalScoreFilter !== null && this.totalScoreFilter.toString() !== '')
		items.push({ FilterName: "TotalScore", FilterType: FilterType.eq, FilterValue: this.totalScoreFilter });
				  
			if (this.submitDateFromFilter !== undefined && this.submitDateFromFilter !== null && this.submitDateFromFilter.toString() !== '')
				items.push({ FilterName: "SubmitDate", FilterType: FilterType.ge, FilterValue: moment(this.submitDateFromFilter).format("YYYY/MM/DD")  });
			if (this.submitDateToFilter !== undefined && this.submitDateToFilter !== null && this.submitDateToFilter.toString() !== '')
				items.push({ FilterName: "SubmitDate", FilterType: FilterType.le, FilterValue: moment(this.submitDateToFilter).format("YYYY/MM/DD")  });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.questionnaireExamResultFormModal.show();
    }

    edit(item: QuestionnaireExamResultDto): void {
        this.questionnaireExamResultFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}