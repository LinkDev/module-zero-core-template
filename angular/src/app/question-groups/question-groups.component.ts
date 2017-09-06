import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { QuestionGroupServiceProxy, QuestionGroupDto, PagedResultDtoOfQuestionGroupDto } from '@shared/service-proxies/service-proxies';
import { SurveyServiceProxy, SurveyDto, PagedResultDtoOfSurveyDto } from '@shared/service-proxies/service-proxies';
import { QuestionGroupFormComponent } from "app/question-groups/question-group-form/question-group-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'question-group',
    templateUrl: './question-groups.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionGroupServiceProxy,
		SurveyServiceProxy,
	]
})
export class QuestionGroupsComponent extends FilteredComponentBase<QuestionGroupDto> {

    @ViewChild('questionGroupFormModal') questionGroupFormModal: QuestionGroupFormComponent;
    
    items: QuestionGroupDto[] = [];
	nameFilter: string;
	isActiveFilter: boolean;
	orderFilter: number;
	surveyIdFilter: string;
	surveyIdList: SurveyDto[] = null;
	codeFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _questionGroupService: QuestionGroupServiceProxy
			, private _surveyService: SurveyServiceProxy
    ) {

        super(injector);
    }

    
	ngOnInit() {
        this._surveyService.getAll().subscribe((data: PagedResultDtoOfSurveyDto) => {
            this.surveyIdList = data.items;
        });

		this.activatedRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            let key = params['key'];
            let value = params['value'];
            this[key + "Filter"] = value;
            this.search();
        });

        super.ngOnInit();
    }


    protected list(request: FilteredResultRequestDto, pageNumber: number, finishedCallback: Function): void {
			this._questionGroupService.getAll(request.search, request.maxResultCount, request.sorting, request.skipCount)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQuestionGroupDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QuestionGroupDto): void {
        abp.message.confirm(
            'Delete Question group?',
            (result: boolean) => {
                if (result) {
                    this._questionGroupService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Question group: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
        if (this.nameFilter !== undefined && this.nameFilter !== null && this.nameFilter.toString() !== '')
        items.push({ FilterName: "Name", FilterType: FilterType.like, FilterValue: this.nameFilter });
        if (this.isActiveFilter !== undefined && this.isActiveFilter !== null && this.isActiveFilter.toString() !== '')
		items.push({ FilterName: "IsActive", FilterType: FilterType.eq, FilterValue: this.isActiveFilter });
        if (this.orderFilter !== undefined && this.orderFilter !== null && this.orderFilter.toString() !== '')
		items.push({ FilterName: "Order", FilterType: FilterType.eq, FilterValue: this.orderFilter });
        if (this.surveyIdFilter !== undefined && this.surveyIdFilter !== null && this.surveyIdFilter.toString() !== '')
		items.push({ FilterName: "SurveyId", FilterType: FilterType.eq, FilterValue: this.surveyIdFilter });
        if (this.codeFilter !== undefined && this.codeFilter !== null && this.codeFilter.toString() !== '')
        items.push({ FilterName: "Code", FilterType: FilterType.like, FilterValue: this.codeFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.questionGroupFormModal.show();
    }

    edit(item: QuestionGroupDto): void {
        this.questionGroupFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}