import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QuestionServiceProxy, QuestionDto, PagedResultDtoOfQuestionDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupServiceProxy, DomainGroupDto, PagedResultDtoOfDomainGroupDto } from '@shared/service-proxies/service-proxies';
import { QuestionGroupServiceProxy, QuestionGroupDto, PagedResultDtoOfQuestionGroupDto } from '@shared/service-proxies/service-proxies';
import { QuestionFormComponent } from "app/questions/question-form/question-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'question',
    templateUrl: './questions.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionServiceProxy,
		DomainGroupServiceProxy,
		QuestionGroupServiceProxy,
	]
})
export class QuestionsComponent extends FilteredComponentBase<QuestionDto> {
	items: QuestionDto[] = [];

    @ViewChild('questionFormModal') questionFormModal: QuestionFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			titleFilter: string;
			isActiveFilter: boolean;
			orderFilter: number;
			questionTypeFilter: number;
			domainGroupIdFilter: string;
	domainGroupIdList: DomainGroupDto[] = null;
			domainGroupLevelsNumberFilter: number;
			questionGroupIdFilter: string;
	questionGroupIdList: QuestionGroupDto[] = null;
			codeFilter: string;
			isRequiredFilter: boolean;
			isHiddenFilter: boolean;
			descriptionFilter: string;
			questionNumberFilter: string;
			helpFilter: string;
			defaultAnswerValueFilter: string;
			isUsedInCallBackFilter: boolean;
			isUsedInEncodingFilter: boolean;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _questionService: QuestionServiceProxy
			, private _domainGroupService: DomainGroupServiceProxy
			, private _questionGroupService: QuestionGroupServiceProxy
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
			this._questionService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQuestionDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QuestionDto): void {
        abp.message.confirm(
            'Delete Question?',
            (result: boolean) => {
                if (result) {
                    this._questionService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Question: ' + item.id);
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
						        if (this.isActiveFilter !== undefined && this.isActiveFilter !== null && this.isActiveFilter.toString() !== '')
		items.push({ FilterName: "IsActive", FilterType: FilterType.eq, FilterValue: this.isActiveFilter });
				        if (this.orderFilter !== undefined && this.orderFilter !== null && this.orderFilter.toString() !== '')
		items.push({ FilterName: "Order", FilterType: FilterType.eq, FilterValue: this.orderFilter });
				        if (this.questionTypeFilter !== undefined && this.questionTypeFilter !== null && this.questionTypeFilter.toString() !== '')
		items.push({ FilterName: "QuestionType", FilterType: FilterType.eq, FilterValue: this.questionTypeFilter });
				        if (this.domainGroupIdFilter !== undefined && this.domainGroupIdFilter !== null && this.domainGroupIdFilter.toString() !== '')
		items.push({ FilterName: "DomainGroupId", FilterType: FilterType.in, FilterValue: this.domainGroupIdFilter });
				        if (this.domainGroupLevelsNumberFilter !== undefined && this.domainGroupLevelsNumberFilter !== null && this.domainGroupLevelsNumberFilter.toString() !== '')
		items.push({ FilterName: "DomainGroupLevelsNumber", FilterType: FilterType.eq, FilterValue: this.domainGroupLevelsNumberFilter });
				        if (this.questionGroupIdFilter !== undefined && this.questionGroupIdFilter !== null && this.questionGroupIdFilter.toString() !== '')
		items.push({ FilterName: "QuestionGroupId", FilterType: FilterType.in, FilterValue: this.questionGroupIdFilter });
				        if (this.codeFilter !== undefined && this.codeFilter !== null && this.codeFilter.toString() !== '')
        items.push({ FilterName: "Code", FilterType: FilterType.like, FilterValue: this.codeFilter });
						        if (this.isRequiredFilter !== undefined && this.isRequiredFilter !== null && this.isRequiredFilter.toString() !== '')
		items.push({ FilterName: "IsRequired", FilterType: FilterType.eq, FilterValue: this.isRequiredFilter });
				        if (this.isHiddenFilter !== undefined && this.isHiddenFilter !== null && this.isHiddenFilter.toString() !== '')
		items.push({ FilterName: "IsHidden", FilterType: FilterType.eq, FilterValue: this.isHiddenFilter });
				        if (this.descriptionFilter !== undefined && this.descriptionFilter !== null && this.descriptionFilter.toString() !== '')
        items.push({ FilterName: "Description", FilterType: FilterType.like, FilterValue: this.descriptionFilter });
						        if (this.questionNumberFilter !== undefined && this.questionNumberFilter !== null && this.questionNumberFilter.toString() !== '')
        items.push({ FilterName: "QuestionNumber", FilterType: FilterType.like, FilterValue: this.questionNumberFilter });
						        if (this.helpFilter !== undefined && this.helpFilter !== null && this.helpFilter.toString() !== '')
        items.push({ FilterName: "Help", FilterType: FilterType.like, FilterValue: this.helpFilter });
						        if (this.defaultAnswerValueFilter !== undefined && this.defaultAnswerValueFilter !== null && this.defaultAnswerValueFilter.toString() !== '')
        items.push({ FilterName: "DefaultAnswerValue", FilterType: FilterType.like, FilterValue: this.defaultAnswerValueFilter });
						        if (this.isUsedInCallBackFilter !== undefined && this.isUsedInCallBackFilter !== null && this.isUsedInCallBackFilter.toString() !== '')
		items.push({ FilterName: "IsUsedInCallBack", FilterType: FilterType.eq, FilterValue: this.isUsedInCallBackFilter });
				        if (this.isUsedInEncodingFilter !== undefined && this.isUsedInEncodingFilter !== null && this.isUsedInEncodingFilter.toString() !== '')
		items.push({ FilterName: "IsUsedInEncoding", FilterType: FilterType.eq, FilterValue: this.isUsedInEncodingFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.questionFormModal.show();
    }

    edit(item: QuestionDto): void {
        this.questionFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}