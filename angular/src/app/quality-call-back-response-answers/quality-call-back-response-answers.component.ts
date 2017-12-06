import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QualityCallBackResponseAnswerServiceProxy, QualityCallBackResponseAnswerDto, PagedResultDtoOfQualityCallBackResponseAnswerDto } from '@shared/service-proxies/service-proxies';
import { QualityCallBackResponseAnswerFormComponent } from "app/quality-call-back-response-answers/quality-call-back-response-answer-form/quality-call-back-response-answer-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'quality-call-back-response-answer',
    templateUrl: './quality-call-back-response-answers.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QualityCallBackResponseAnswerServiceProxy,
	]
})
export class QualityCallBackResponseAnswersComponent extends FilteredComponentBase<QualityCallBackResponseAnswerDto> {
	items: QualityCallBackResponseAnswerDto[] = [];

    @ViewChild('qualityCallBackResponseAnswerFormModal') qualityCallBackResponseAnswerFormModal: QualityCallBackResponseAnswerFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			responseAnswerIdFilter: string;
			questionIdFilter: string;
			questionAnswerIdFilter: string;
			answerValueFilter: string;
			answerNumberFilter: number;
			answerTimeFromFilter: moment.Moment=null;
	answerTimeToFilter: moment.Moment=null;
				responseIdFilter: string;
			statusFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _qualityCallBackResponseAnswerService: QualityCallBackResponseAnswerServiceProxy
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
			this._qualityCallBackResponseAnswerService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQualityCallBackResponseAnswerDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QualityCallBackResponseAnswerDto): void {
        abp.message.confirm(
            'Delete Quality call back response answer?',
            (result: boolean) => {
                if (result) {
                    this._qualityCallBackResponseAnswerService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Quality call back response answer: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.responseAnswerIdFilter !== undefined && this.responseAnswerIdFilter !== null && this.responseAnswerIdFilter.toString() !== '')
        items.push({ FilterName: "ResponseAnswerId", FilterType: FilterType.like, FilterValue: this.responseAnswerIdFilter });
						        if (this.questionIdFilter !== undefined && this.questionIdFilter !== null && this.questionIdFilter.toString() !== '')
        items.push({ FilterName: "QuestionId", FilterType: FilterType.like, FilterValue: this.questionIdFilter });
						        if (this.questionAnswerIdFilter !== undefined && this.questionAnswerIdFilter !== null && this.questionAnswerIdFilter.toString() !== '')
        items.push({ FilterName: "QuestionAnswerId", FilterType: FilterType.like, FilterValue: this.questionAnswerIdFilter });
						        if (this.answerValueFilter !== undefined && this.answerValueFilter !== null && this.answerValueFilter.toString() !== '')
        items.push({ FilterName: "AnswerValue", FilterType: FilterType.like, FilterValue: this.answerValueFilter });
						        if (this.answerNumberFilter !== undefined && this.answerNumberFilter !== null && this.answerNumberFilter.toString() !== '')
		items.push({ FilterName: "AnswerNumber", FilterType: FilterType.eq, FilterValue: this.answerNumberFilter });
				  
			if (this.answerTimeFromFilter !== undefined && this.answerTimeFromFilter !== null && this.answerTimeFromFilter.toString() !== '')
				items.push({ FilterName: "AnswerTime", FilterType: FilterType.ge, FilterValue: moment(this.answerTimeFromFilter).format("YYYY/MM/DD")  });
			if (this.answerTimeToFilter !== undefined && this.answerTimeToFilter !== null && this.answerTimeToFilter.toString() !== '')
				items.push({ FilterName: "AnswerTime", FilterType: FilterType.le, FilterValue: moment(this.answerTimeToFilter).format("YYYY/MM/DD")  });
						        if (this.responseIdFilter !== undefined && this.responseIdFilter !== null && this.responseIdFilter.toString() !== '')
        items.push({ FilterName: "ResponseId", FilterType: FilterType.like, FilterValue: this.responseIdFilter });
						        if (this.statusFilter !== undefined && this.statusFilter !== null && this.statusFilter.toString() !== '')
		items.push({ FilterName: "Status", FilterType: FilterType.eq, FilterValue: this.statusFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.qualityCallBackResponseAnswerFormModal.show();
    }

    edit(item: QualityCallBackResponseAnswerDto): void {
        this.qualityCallBackResponseAnswerFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}