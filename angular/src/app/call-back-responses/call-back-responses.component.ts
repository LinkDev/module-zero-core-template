import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { CallBackResponseServiceProxy, CallBackResponseDto, PagedResultDtoOfCallBackResponseDto } from '@shared/service-proxies/service-proxies';
import { SurveyServiceProxy, SurveyDto, PagedResultDtoOfSurveyDto } from '@shared/service-proxies/service-proxies';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { PhaseServiceProxy, PhaseDto, PagedResultDtoOfPhaseDto } from '@shared/service-proxies/service-proxies';
import { SampleServiceProxy, SampleDto, PagedResultDtoOfSampleDto } from '@shared/service-proxies/service-proxies';
import { CallBackResponseFormComponent } from "app/call-back-responses/call-back-response-form/call-back-response-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'call-back-response',
    templateUrl: './call-back-responses.component.html',
    animations: [appModuleAnimation()],
    providers: [
		CallBackResponseServiceProxy,
		SurveyServiceProxy,
		DomainServiceProxy,
		PhaseServiceProxy,
		SampleServiceProxy,
	]
})
export class CallBackResponsesComponent extends FilteredComponentBase<CallBackResponseDto> {
	items: CallBackResponseDto[] = [];

    @ViewChild('callBackResponseFormModal') callBackResponseFormModal: CallBackResponseFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			responseIdFilter: string;
			surveyIdFilter: string;
	surveyIdList: SurveyDto[] = null;
			userIdFilter: string;
			dateSubmittedFromFilter: moment.Moment=null;
	dateSubmittedToFilter: moment.Moment=null;
				parentResponseIdFilter: string;
			codeFilter: string;
			domainIdFilter: string;
	domainIdList: DomainDto[] = null;
			statusFilter: number;
			titleFilter: string;
			orderFilter: number;
			lastUpdateTimeFromFilter: moment.Moment=null;
	lastUpdateTimeToFilter: moment.Moment=null;
				subCodeFilter: string;
			phaseIdFilter: string;
	phaseIdList: PhaseDto[] = null;
			gISUniqueCodeFilter: string;
			isPrintedFilter: boolean;
			sampleIDFilter: string;
	sampleIDList: SampleDto[] = null;
			resIdxFilter: number;
			hvResponsesAnswerFilter: boolean;
			similarityPercentageFilter: number;
			correspondenceFilter: boolean;
			cbParentResponseIdFilter: string;
	cbParentResponseIdList: CallBackResponseDto[] = null;
			responseStatusFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _callBackResponseService: CallBackResponseServiceProxy
			, private _surveyService: SurveyServiceProxy
			, private _domainService: DomainServiceProxy
			, private _phaseService: PhaseServiceProxy
			, private _sampleService: SampleServiceProxy
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
			this._callBackResponseService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfCallBackResponseDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: CallBackResponseDto): void {
        abp.message.confirm(
            'Delete Call back response?',
            (result: boolean) => {
                if (result) {
                    this._callBackResponseService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Call back response: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.responseIdFilter !== undefined && this.responseIdFilter !== null && this.responseIdFilter.toString() !== '')
        items.push({ FilterName: "ResponseId", FilterType: FilterType.like, FilterValue: this.responseIdFilter });
						        if (this.surveyIdFilter !== undefined && this.surveyIdFilter !== null && this.surveyIdFilter.toString() !== '')
		items.push({ FilterName: "SurveyId", FilterType: FilterType.in, FilterValue: this.surveyIdFilter });
				        if (this.userIdFilter !== undefined && this.userIdFilter !== null && this.userIdFilter.toString() !== '')
        items.push({ FilterName: "UserId", FilterType: FilterType.like, FilterValue: this.userIdFilter });
						  
			if (this.dateSubmittedFromFilter !== undefined && this.dateSubmittedFromFilter !== null && this.dateSubmittedFromFilter.toString() !== '')
				items.push({ FilterName: "DateSubmitted", FilterType: FilterType.ge, FilterValue: moment(this.dateSubmittedFromFilter).format("YYYY/MM/DD")  });
			if (this.dateSubmittedToFilter !== undefined && this.dateSubmittedToFilter !== null && this.dateSubmittedToFilter.toString() !== '')
				items.push({ FilterName: "DateSubmitted", FilterType: FilterType.le, FilterValue: moment(this.dateSubmittedToFilter).format("YYYY/MM/DD")  });
						        if (this.parentResponseIdFilter !== undefined && this.parentResponseIdFilter !== null && this.parentResponseIdFilter.toString() !== '')
        items.push({ FilterName: "ParentResponseId", FilterType: FilterType.like, FilterValue: this.parentResponseIdFilter });
						        if (this.codeFilter !== undefined && this.codeFilter !== null && this.codeFilter.toString() !== '')
        items.push({ FilterName: "Code", FilterType: FilterType.like, FilterValue: this.codeFilter });
						        if (this.domainIdFilter !== undefined && this.domainIdFilter !== null && this.domainIdFilter.toString() !== '')
		items.push({ FilterName: "DomainId", FilterType: FilterType.in, FilterValue: this.domainIdFilter });
				        if (this.statusFilter !== undefined && this.statusFilter !== null && this.statusFilter.toString() !== '')
		items.push({ FilterName: "Status", FilterType: FilterType.eq, FilterValue: this.statusFilter });
				        if (this.titleFilter !== undefined && this.titleFilter !== null && this.titleFilter.toString() !== '')
        items.push({ FilterName: "Title", FilterType: FilterType.like, FilterValue: this.titleFilter });
						        if (this.orderFilter !== undefined && this.orderFilter !== null && this.orderFilter.toString() !== '')
		items.push({ FilterName: "Order", FilterType: FilterType.eq, FilterValue: this.orderFilter });
				  
			if (this.lastUpdateTimeFromFilter !== undefined && this.lastUpdateTimeFromFilter !== null && this.lastUpdateTimeFromFilter.toString() !== '')
				items.push({ FilterName: "LastUpdateTime", FilterType: FilterType.ge, FilterValue: moment(this.lastUpdateTimeFromFilter).format("YYYY/MM/DD")  });
			if (this.lastUpdateTimeToFilter !== undefined && this.lastUpdateTimeToFilter !== null && this.lastUpdateTimeToFilter.toString() !== '')
				items.push({ FilterName: "LastUpdateTime", FilterType: FilterType.le, FilterValue: moment(this.lastUpdateTimeToFilter).format("YYYY/MM/DD")  });
						        if (this.subCodeFilter !== undefined && this.subCodeFilter !== null && this.subCodeFilter.toString() !== '')
        items.push({ FilterName: "SubCode", FilterType: FilterType.like, FilterValue: this.subCodeFilter });
						        if (this.phaseIdFilter !== undefined && this.phaseIdFilter !== null && this.phaseIdFilter.toString() !== '')
		items.push({ FilterName: "PhaseId", FilterType: FilterType.in, FilterValue: this.phaseIdFilter });
				        if (this.gISUniqueCodeFilter !== undefined && this.gISUniqueCodeFilter !== null && this.gISUniqueCodeFilter.toString() !== '')
        items.push({ FilterName: "GISUniqueCode", FilterType: FilterType.like, FilterValue: this.gISUniqueCodeFilter });
						        if (this.isPrintedFilter !== undefined && this.isPrintedFilter !== null && this.isPrintedFilter.toString() !== '')
		items.push({ FilterName: "IsPrinted", FilterType: FilterType.eq, FilterValue: this.isPrintedFilter });
				        if (this.sampleIDFilter !== undefined && this.sampleIDFilter !== null && this.sampleIDFilter.toString() !== '')
		items.push({ FilterName: "SampleID", FilterType: FilterType.in, FilterValue: this.sampleIDFilter });
				        if (this.resIdxFilter !== undefined && this.resIdxFilter !== null && this.resIdxFilter.toString() !== '')
		items.push({ FilterName: "ResIdx", FilterType: FilterType.eq, FilterValue: this.resIdxFilter });
				        if (this.hvResponsesAnswerFilter !== undefined && this.hvResponsesAnswerFilter !== null && this.hvResponsesAnswerFilter.toString() !== '')
		items.push({ FilterName: "HvResponsesAnswer", FilterType: FilterType.eq, FilterValue: this.hvResponsesAnswerFilter });
				        if (this.similarityPercentageFilter !== undefined && this.similarityPercentageFilter !== null && this.similarityPercentageFilter.toString() !== '')
		items.push({ FilterName: "SimilarityPercentage", FilterType: FilterType.eq, FilterValue: this.similarityPercentageFilter });
				        if (this.correspondenceFilter !== undefined && this.correspondenceFilter !== null && this.correspondenceFilter.toString() !== '')
		items.push({ FilterName: "Correspondence", FilterType: FilterType.eq, FilterValue: this.correspondenceFilter });
				        if (this.cbParentResponseIdFilter !== undefined && this.cbParentResponseIdFilter !== null && this.cbParentResponseIdFilter.toString() !== '')
		items.push({ FilterName: "CbParentResponseId", FilterType: FilterType.in, FilterValue: this.cbParentResponseIdFilter });
				        if (this.responseStatusFilter !== undefined && this.responseStatusFilter !== null && this.responseStatusFilter.toString() !== '')
		items.push({ FilterName: "ResponseStatus", FilterType: FilterType.eq, FilterValue: this.responseStatusFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.callBackResponseFormModal.show();
    }

    edit(item: CallBackResponseDto): void {
        this.callBackResponseFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}