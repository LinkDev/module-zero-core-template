import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { SimilarityPercentageServiceProxy, SimilarityPercentageDto, PagedResultDtoOfSimilarityPercentageDto } from '@shared/service-proxies/service-proxies';
import { SimilarityPercentageFormComponent } from "app/similarity-percentages/similarity-percentage-form/similarity-percentage-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'similarity-percentage',
    templateUrl: './similarity-percentages.component.html',
    animations: [appModuleAnimation()],
    providers: [
		SimilarityPercentageServiceProxy,
	]
})
export class SimilarityPercentagesComponent extends FilteredComponentBase<SimilarityPercentageDto> {
	items: SimilarityPercentageDto[] = [];

    @ViewChild('similarityPercentageFormModal') similarityPercentageFormModal: SimilarityPercentageFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			qualityParentResponseIdFilter: string;
			qualityResponseCodeFilter: string;
			realResponseIdFilter: string;
			realParentResponseIdFilter: string;
			realResponseCodeFilter: string;
			surveyIdFilter: string;
			similarResponseAnswersCountFilter: number;
			allResponseAnswersCountFilter: number;
			relationCodeFilter: number;
			typeCodeFilter: number;
			ageFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _similarityPercentageService: SimilarityPercentageServiceProxy
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
			this._similarityPercentageService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfSimilarityPercentageDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: SimilarityPercentageDto): void {
        abp.message.confirm(
            'Delete Similarity percentage?',
            (result: boolean) => {
                if (result) {
                    this._similarityPercentageService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Similarity percentage: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.qualityParentResponseIdFilter !== undefined && this.qualityParentResponseIdFilter !== null && this.qualityParentResponseIdFilter.toString() !== '')
        items.push({ FilterName: "QualityParentResponseId", FilterType: FilterType.like, FilterValue: this.qualityParentResponseIdFilter });
						        if (this.qualityResponseCodeFilter !== undefined && this.qualityResponseCodeFilter !== null && this.qualityResponseCodeFilter.toString() !== '')
        items.push({ FilterName: "QualityResponseCode", FilterType: FilterType.like, FilterValue: this.qualityResponseCodeFilter });
						        if (this.realResponseIdFilter !== undefined && this.realResponseIdFilter !== null && this.realResponseIdFilter.toString() !== '')
        items.push({ FilterName: "RealResponseId", FilterType: FilterType.like, FilterValue: this.realResponseIdFilter });
						        if (this.realParentResponseIdFilter !== undefined && this.realParentResponseIdFilter !== null && this.realParentResponseIdFilter.toString() !== '')
        items.push({ FilterName: "RealParentResponseId", FilterType: FilterType.like, FilterValue: this.realParentResponseIdFilter });
						        if (this.realResponseCodeFilter !== undefined && this.realResponseCodeFilter !== null && this.realResponseCodeFilter.toString() !== '')
        items.push({ FilterName: "RealResponseCode", FilterType: FilterType.like, FilterValue: this.realResponseCodeFilter });
						        if (this.surveyIdFilter !== undefined && this.surveyIdFilter !== null && this.surveyIdFilter.toString() !== '')
        items.push({ FilterName: "SurveyId", FilterType: FilterType.like, FilterValue: this.surveyIdFilter });
						        if (this.similarResponseAnswersCountFilter !== undefined && this.similarResponseAnswersCountFilter !== null && this.similarResponseAnswersCountFilter.toString() !== '')
		items.push({ FilterName: "SimilarResponseAnswersCount", FilterType: FilterType.eq, FilterValue: this.similarResponseAnswersCountFilter });
				        if (this.allResponseAnswersCountFilter !== undefined && this.allResponseAnswersCountFilter !== null && this.allResponseAnswersCountFilter.toString() !== '')
		items.push({ FilterName: "AllResponseAnswersCount", FilterType: FilterType.eq, FilterValue: this.allResponseAnswersCountFilter });
				        if (this.relationCodeFilter !== undefined && this.relationCodeFilter !== null && this.relationCodeFilter.toString() !== '')
		items.push({ FilterName: "RelationCode", FilterType: FilterType.eq, FilterValue: this.relationCodeFilter });
				        if (this.typeCodeFilter !== undefined && this.typeCodeFilter !== null && this.typeCodeFilter.toString() !== '')
		items.push({ FilterName: "TypeCode", FilterType: FilterType.eq, FilterValue: this.typeCodeFilter });
				        if (this.ageFilter !== undefined && this.ageFilter !== null && this.ageFilter.toString() !== '')
		items.push({ FilterName: "Age", FilterType: FilterType.eq, FilterValue: this.ageFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.similarityPercentageFormModal.show();
    }

    edit(item: SimilarityPercentageDto): void {
        this.similarityPercentageFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}