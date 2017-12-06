import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { EncodingResponseServiceProxy, EncodingResponseDto, PagedResultDtoOfEncodingResponseDto } from '@shared/service-proxies/service-proxies';
import { EncodingResponseFormComponent } from "app/encoding-responses/encoding-response-form/encoding-response-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'encoding-response',
    templateUrl: './encoding-responses.component.html',
    animations: [appModuleAnimation()],
    providers: [
		EncodingResponseServiceProxy,
	]
})
export class EncodingResponsesComponent extends FilteredComponentBase<EncodingResponseDto> {
	items: EncodingResponseDto[] = [];

    @ViewChild('encodingResponseFormModal') encodingResponseFormModal: EncodingResponseFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			responseCodeFilter: string;
			surveyIdFilter: string;
			domainIdFilter: string;
			domainNameFilter: string;
			titleFilter: string;
			userNameFilter: string;
			coderIdFilter: string;
			coderNameFilter: string;
			dateCodedFromFilter: moment.Moment=null;
	dateCodedToFilter: moment.Moment=null;
				reviewerIdFilter: string;
			reviewerNameFilter: string;
			dateReviewedFromFilter: moment.Moment=null;
	dateReviewedToFilter: moment.Moment=null;
				statusFilter: number;
			indexFilter: number;
			responseAnswersFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _encodingResponseService: EncodingResponseServiceProxy
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
			this._encodingResponseService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfEncodingResponseDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: EncodingResponseDto): void {
        abp.message.confirm(
            'Delete Encoding response?',
            (result: boolean) => {
                if (result) {
                    this._encodingResponseService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Encoding response: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.responseCodeFilter !== undefined && this.responseCodeFilter !== null && this.responseCodeFilter.toString() !== '')
        items.push({ FilterName: "ResponseCode", FilterType: FilterType.like, FilterValue: this.responseCodeFilter });
						        if (this.surveyIdFilter !== undefined && this.surveyIdFilter !== null && this.surveyIdFilter.toString() !== '')
        items.push({ FilterName: "SurveyId", FilterType: FilterType.like, FilterValue: this.surveyIdFilter });
						        if (this.domainIdFilter !== undefined && this.domainIdFilter !== null && this.domainIdFilter.toString() !== '')
        items.push({ FilterName: "DomainId", FilterType: FilterType.like, FilterValue: this.domainIdFilter });
						        if (this.domainNameFilter !== undefined && this.domainNameFilter !== null && this.domainNameFilter.toString() !== '')
        items.push({ FilterName: "DomainName", FilterType: FilterType.like, FilterValue: this.domainNameFilter });
						        if (this.titleFilter !== undefined && this.titleFilter !== null && this.titleFilter.toString() !== '')
        items.push({ FilterName: "Title", FilterType: FilterType.like, FilterValue: this.titleFilter });
						        if (this.userNameFilter !== undefined && this.userNameFilter !== null && this.userNameFilter.toString() !== '')
        items.push({ FilterName: "UserName", FilterType: FilterType.like, FilterValue: this.userNameFilter });
						        if (this.coderIdFilter !== undefined && this.coderIdFilter !== null && this.coderIdFilter.toString() !== '')
        items.push({ FilterName: "CoderId", FilterType: FilterType.like, FilterValue: this.coderIdFilter });
						        if (this.coderNameFilter !== undefined && this.coderNameFilter !== null && this.coderNameFilter.toString() !== '')
        items.push({ FilterName: "CoderName", FilterType: FilterType.like, FilterValue: this.coderNameFilter });
						  
			if (this.dateCodedFromFilter !== undefined && this.dateCodedFromFilter !== null && this.dateCodedFromFilter.toString() !== '')
				items.push({ FilterName: "DateCoded", FilterType: FilterType.ge, FilterValue: moment(this.dateCodedFromFilter).format("YYYY/MM/DD")  });
			if (this.dateCodedToFilter !== undefined && this.dateCodedToFilter !== null && this.dateCodedToFilter.toString() !== '')
				items.push({ FilterName: "DateCoded", FilterType: FilterType.le, FilterValue: moment(this.dateCodedToFilter).format("YYYY/MM/DD")  });
						        if (this.reviewerIdFilter !== undefined && this.reviewerIdFilter !== null && this.reviewerIdFilter.toString() !== '')
        items.push({ FilterName: "ReviewerId", FilterType: FilterType.like, FilterValue: this.reviewerIdFilter });
						        if (this.reviewerNameFilter !== undefined && this.reviewerNameFilter !== null && this.reviewerNameFilter.toString() !== '')
        items.push({ FilterName: "ReviewerName", FilterType: FilterType.like, FilterValue: this.reviewerNameFilter });
						  
			if (this.dateReviewedFromFilter !== undefined && this.dateReviewedFromFilter !== null && this.dateReviewedFromFilter.toString() !== '')
				items.push({ FilterName: "DateReviewed", FilterType: FilterType.ge, FilterValue: moment(this.dateReviewedFromFilter).format("YYYY/MM/DD")  });
			if (this.dateReviewedToFilter !== undefined && this.dateReviewedToFilter !== null && this.dateReviewedToFilter.toString() !== '')
				items.push({ FilterName: "DateReviewed", FilterType: FilterType.le, FilterValue: moment(this.dateReviewedToFilter).format("YYYY/MM/DD")  });
						        if (this.statusFilter !== undefined && this.statusFilter !== null && this.statusFilter.toString() !== '')
		items.push({ FilterName: "Status", FilterType: FilterType.eq, FilterValue: this.statusFilter });
				        if (this.indexFilter !== undefined && this.indexFilter !== null && this.indexFilter.toString() !== '')
		items.push({ FilterName: "Index", FilterType: FilterType.eq, FilterValue: this.indexFilter });
				        if (this.responseAnswersFilter !== undefined && this.responseAnswersFilter !== null && this.responseAnswersFilter.toString() !== '')
        items.push({ FilterName: "ResponseAnswers", FilterType: FilterType.like, FilterValue: this.responseAnswersFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.encodingResponseFormModal.show();
    }

    edit(item: EncodingResponseDto): void {
        this.encodingResponseFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}