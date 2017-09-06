import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { SurveyServiceProxy, SurveyDto, PagedResultDtoOfSurveyDto } from '@shared/service-proxies/service-proxies';
import { SurveyFormComponent } from "app/surveys/survey-form/survey-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'survey',
    templateUrl: './surveys.component.html',
    animations: [appModuleAnimation()],
    providers: [
		SurveyServiceProxy,
	]
})
export class SurveysComponent extends FilteredComponentBase<SurveyDto> {

    @ViewChild('surveyFormModal') surveyFormModal: SurveyFormComponent;
    
    items: SurveyDto[] = [];
	nameFilter: string;
	isActiveFilter: boolean;
	parentSurveyIdFilter: string;
	parentSurveyIdList: SurveyDto[] = null;
	parentSurveyRelationFilter: number;
	isEnabledFilter: boolean;
	codeFilter: string;
	iconFilter: string;
	allowAddResponseFilter: boolean;
	typeTextFilter: string;
	serialDigitsCountFilter: number;
	lastUpdateTimeFilter: string;
	mappedToSurveyIdFilter: string;
	minMinutesFilter: number;
	dailyTargetFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _surveyService: SurveyServiceProxy
    ) {

        super(injector);
    }

    
	ngOnInit() {

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
			this._surveyService.getAll(request.search, request.maxResultCount, request.sorting, request.skipCount)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfSurveyDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: SurveyDto): void {
        abp.message.confirm(
            'Delete Survey?',
            (result: boolean) => {
                if (result) {
                    this._surveyService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Survey: ' + item.id);
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
        if (this.parentSurveyIdFilter !== undefined && this.parentSurveyIdFilter !== null && this.parentSurveyIdFilter.toString() !== '')
		items.push({ FilterName: "ParentSurveyId", FilterType: FilterType.eq, FilterValue: this.parentSurveyIdFilter });
        if (this.parentSurveyRelationFilter !== undefined && this.parentSurveyRelationFilter !== null && this.parentSurveyRelationFilter.toString() !== '')
		items.push({ FilterName: "ParentSurveyRelation", FilterType: FilterType.eq, FilterValue: this.parentSurveyRelationFilter });
        if (this.isEnabledFilter !== undefined && this.isEnabledFilter !== null && this.isEnabledFilter.toString() !== '')
		items.push({ FilterName: "IsEnabled", FilterType: FilterType.eq, FilterValue: this.isEnabledFilter });
        if (this.codeFilter !== undefined && this.codeFilter !== null && this.codeFilter.toString() !== '')
        items.push({ FilterName: "Code", FilterType: FilterType.like, FilterValue: this.codeFilter });
        if (this.iconFilter !== undefined && this.iconFilter !== null && this.iconFilter.toString() !== '')
        items.push({ FilterName: "Icon", FilterType: FilterType.like, FilterValue: this.iconFilter });
        if (this.allowAddResponseFilter !== undefined && this.allowAddResponseFilter !== null && this.allowAddResponseFilter.toString() !== '')
		items.push({ FilterName: "AllowAddResponse", FilterType: FilterType.eq, FilterValue: this.allowAddResponseFilter });
        if (this.typeTextFilter !== undefined && this.typeTextFilter !== null && this.typeTextFilter.toString() !== '')
        items.push({ FilterName: "TypeText", FilterType: FilterType.like, FilterValue: this.typeTextFilter });
        if (this.serialDigitsCountFilter !== undefined && this.serialDigitsCountFilter !== null && this.serialDigitsCountFilter.toString() !== '')
		items.push({ FilterName: "SerialDigitsCount", FilterType: FilterType.eq, FilterValue: this.serialDigitsCountFilter });
        if (this.lastUpdateTimeFilter !== undefined && this.lastUpdateTimeFilter !== null && this.lastUpdateTimeFilter.toString() !== '')
        items.push({ FilterName: "LastUpdateTime", FilterType: FilterType.like, FilterValue: this.lastUpdateTimeFilter });
        if (this.mappedToSurveyIdFilter !== undefined && this.mappedToSurveyIdFilter !== null && this.mappedToSurveyIdFilter.toString() !== '')
        items.push({ FilterName: "MappedToSurveyId", FilterType: FilterType.like, FilterValue: this.mappedToSurveyIdFilter });
        if (this.minMinutesFilter !== undefined && this.minMinutesFilter !== null && this.minMinutesFilter.toString() !== '')
		items.push({ FilterName: "MinMinutes", FilterType: FilterType.eq, FilterValue: this.minMinutesFilter });
        if (this.dailyTargetFilter !== undefined && this.dailyTargetFilter !== null && this.dailyTargetFilter.toString() !== '')
		items.push({ FilterName: "DailyTarget", FilterType: FilterType.eq, FilterValue: this.dailyTargetFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.surveyFormModal.show();
    }

    edit(item: SurveyDto): void {
        this.surveyFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}