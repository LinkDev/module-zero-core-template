import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { SimilarityDataByCallCenterServiceProxy, SimilarityDataByCallCenterDto, PagedResultDtoOfSimilarityDataByCallCenterDto } from '@shared/service-proxies/service-proxies';
import { SimilarityDataByCallCenterFormComponent } from "app/similarity-data-by-call-centers/similarity-data-by-call-center-form/similarity-data-by-call-center-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'similarity-data-by-call-center',
    templateUrl: './similarity-data-by-call-centers.component.html',
    animations: [appModuleAnimation()],
    providers: [
		SimilarityDataByCallCenterServiceProxy,
	]
})
export class SimilarityDataByCallCentersComponent extends FilteredComponentBase<SimilarityDataByCallCenterDto> {
	items: SimilarityDataByCallCenterDto[] = [];

    @ViewChild('similarityDataByCallCenterFormModal') similarityDataByCallCenterFormModal: SimilarityDataByCallCenterFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			domainIdFilter: string;
			parentDomainIdFilter: string;
			domainNameFilter: string;
			domainCodeFilter: string;
			phaseIdFilter: string;
			surveyIdFilter: string;
			questionIdFilter: string;
			similarResponseAnswersCountFilter: number;
			allResponseAnswersCountFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _similarityDataByCallCenterService: SimilarityDataByCallCenterServiceProxy
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
			this._similarityDataByCallCenterService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfSimilarityDataByCallCenterDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: SimilarityDataByCallCenterDto): void {
        abp.message.confirm(
            'Delete Similarity data by call center?',
            (result: boolean) => {
                if (result) {
                    this._similarityDataByCallCenterService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Similarity data by call center: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.domainIdFilter !== undefined && this.domainIdFilter !== null && this.domainIdFilter.toString() !== '')
        items.push({ FilterName: "DomainId", FilterType: FilterType.like, FilterValue: this.domainIdFilter });
						        if (this.parentDomainIdFilter !== undefined && this.parentDomainIdFilter !== null && this.parentDomainIdFilter.toString() !== '')
        items.push({ FilterName: "ParentDomainId", FilterType: FilterType.like, FilterValue: this.parentDomainIdFilter });
						        if (this.domainNameFilter !== undefined && this.domainNameFilter !== null && this.domainNameFilter.toString() !== '')
        items.push({ FilterName: "DomainName", FilterType: FilterType.like, FilterValue: this.domainNameFilter });
						        if (this.domainCodeFilter !== undefined && this.domainCodeFilter !== null && this.domainCodeFilter.toString() !== '')
        items.push({ FilterName: "DomainCode", FilterType: FilterType.like, FilterValue: this.domainCodeFilter });
						        if (this.phaseIdFilter !== undefined && this.phaseIdFilter !== null && this.phaseIdFilter.toString() !== '')
        items.push({ FilterName: "PhaseId", FilterType: FilterType.like, FilterValue: this.phaseIdFilter });
						        if (this.surveyIdFilter !== undefined && this.surveyIdFilter !== null && this.surveyIdFilter.toString() !== '')
        items.push({ FilterName: "SurveyId", FilterType: FilterType.like, FilterValue: this.surveyIdFilter });
						        if (this.questionIdFilter !== undefined && this.questionIdFilter !== null && this.questionIdFilter.toString() !== '')
        items.push({ FilterName: "QuestionId", FilterType: FilterType.like, FilterValue: this.questionIdFilter });
						        if (this.similarResponseAnswersCountFilter !== undefined && this.similarResponseAnswersCountFilter !== null && this.similarResponseAnswersCountFilter.toString() !== '')
		items.push({ FilterName: "SimilarResponseAnswersCount", FilterType: FilterType.eq, FilterValue: this.similarResponseAnswersCountFilter });
				        if (this.allResponseAnswersCountFilter !== undefined && this.allResponseAnswersCountFilter !== null && this.allResponseAnswersCountFilter.toString() !== '')
		items.push({ FilterName: "AllResponseAnswersCount", FilterType: FilterType.eq, FilterValue: this.allResponseAnswersCountFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.similarityDataByCallCenterFormModal.show();
    }

    edit(item: SimilarityDataByCallCenterDto): void {
        this.similarityDataByCallCenterFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}