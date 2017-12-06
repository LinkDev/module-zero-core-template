import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { ResponseServiceProxy, ResponseDto, PagedResultDtoOfResponseDto } from '@shared/service-proxies/service-proxies';
import { ResponseFormComponent } from "app/responses/response-form/response-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'response',
    templateUrl: './responses.component.html',
    animations: [appModuleAnimation()],
    providers: [
		ResponseServiceProxy,
	]
})
export class ResponsesComponent extends FilteredComponentBase<ResponseDto> {
	items: ResponseDto[] = [];

    @ViewChild('responseFormModal') responseFormModal: ResponseFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			surveyIdFilter: string;
			userIdFilter: string;
			dateSubmittedFromFilter: moment.Moment=null;
	dateSubmittedToFilter: moment.Moment=null;
				parentResponseIdFilter: string;
			startTimeFromFilter: moment.Moment=null;
	startTimeToFilter: moment.Moment=null;
				endTimeFromFilter: moment.Moment=null;
	endTimeToFilter: moment.Moment=null;
						codeFilter: string;
			domainIdFilter: string;
			statusFilter: number;
			subStatusIdFilter: string;
			titleFilter: string;
			orderFilter: number;
			lastUpdateTimeFromFilter: moment.Moment=null;
	lastUpdateTimeToFilter: moment.Moment=null;
					isRealFilter: boolean;
			isNewFilter: boolean;
			subCodeFilter: string;
			phaseIdFilter: string;
			creationPhaseIdFilter: string;
			deletionPhaseIdFilter: string;
			gISUniqueCodeFilter: string;
			skipReasonFilter: number;
			skipCommentFilter: string;
			calledByCallCenterFilter: number;
			callCenterCommentFilter: string;
			similarityPercentageFilter: number;
			isPulledFilter: boolean;
			codeToPartitionFilter: number;
			sourceFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _responseService: ResponseServiceProxy
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
			this._responseService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfResponseDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: ResponseDto): void {
        abp.message.confirm(
            'Delete Response?',
            (result: boolean) => {
                if (result) {
                    this._responseService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Response: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.surveyIdFilter !== undefined && this.surveyIdFilter !== null && this.surveyIdFilter.toString() !== '')
        items.push({ FilterName: "SurveyId", FilterType: FilterType.like, FilterValue: this.surveyIdFilter });
						        if (this.userIdFilter !== undefined && this.userIdFilter !== null && this.userIdFilter.toString() !== '')
        items.push({ FilterName: "UserId", FilterType: FilterType.like, FilterValue: this.userIdFilter });
						  
			if (this.dateSubmittedFromFilter !== undefined && this.dateSubmittedFromFilter !== null && this.dateSubmittedFromFilter.toString() !== '')
				items.push({ FilterName: "DateSubmitted", FilterType: FilterType.ge, FilterValue: moment(this.dateSubmittedFromFilter).format("YYYY/MM/DD")  });
			if (this.dateSubmittedToFilter !== undefined && this.dateSubmittedToFilter !== null && this.dateSubmittedToFilter.toString() !== '')
				items.push({ FilterName: "DateSubmitted", FilterType: FilterType.le, FilterValue: moment(this.dateSubmittedToFilter).format("YYYY/MM/DD")  });
						        if (this.parentResponseIdFilter !== undefined && this.parentResponseIdFilter !== null && this.parentResponseIdFilter.toString() !== '')
        items.push({ FilterName: "ParentResponseId", FilterType: FilterType.like, FilterValue: this.parentResponseIdFilter });
						  
			if (this.startTimeFromFilter !== undefined && this.startTimeFromFilter !== null && this.startTimeFromFilter.toString() !== '')
				items.push({ FilterName: "StartTime", FilterType: FilterType.ge, FilterValue: moment(this.startTimeFromFilter).format("YYYY/MM/DD")  });
			if (this.startTimeToFilter !== undefined && this.startTimeToFilter !== null && this.startTimeToFilter.toString() !== '')
				items.push({ FilterName: "StartTime", FilterType: FilterType.le, FilterValue: moment(this.startTimeToFilter).format("YYYY/MM/DD")  });
						  
			if (this.endTimeFromFilter !== undefined && this.endTimeFromFilter !== null && this.endTimeFromFilter.toString() !== '')
				items.push({ FilterName: "EndTime", FilterType: FilterType.ge, FilterValue: moment(this.endTimeFromFilter).format("YYYY/MM/DD")  });
			if (this.endTimeToFilter !== undefined && this.endTimeToFilter !== null && this.endTimeToFilter.toString() !== '')
				items.push({ FilterName: "EndTime", FilterType: FilterType.le, FilterValue: moment(this.endTimeToFilter).format("YYYY/MM/DD")  });
										        if (this.codeFilter !== undefined && this.codeFilter !== null && this.codeFilter.toString() !== '')
        items.push({ FilterName: "Code", FilterType: FilterType.like, FilterValue: this.codeFilter });
						        if (this.domainIdFilter !== undefined && this.domainIdFilter !== null && this.domainIdFilter.toString() !== '')
        items.push({ FilterName: "DomainId", FilterType: FilterType.like, FilterValue: this.domainIdFilter });
						        if (this.statusFilter !== undefined && this.statusFilter !== null && this.statusFilter.toString() !== '')
		items.push({ FilterName: "Status", FilterType: FilterType.eq, FilterValue: this.statusFilter });
				        if (this.subStatusIdFilter !== undefined && this.subStatusIdFilter !== null && this.subStatusIdFilter.toString() !== '')
        items.push({ FilterName: "SubStatusId", FilterType: FilterType.like, FilterValue: this.subStatusIdFilter });
						        if (this.titleFilter !== undefined && this.titleFilter !== null && this.titleFilter.toString() !== '')
        items.push({ FilterName: "Title", FilterType: FilterType.like, FilterValue: this.titleFilter });
						        if (this.orderFilter !== undefined && this.orderFilter !== null && this.orderFilter.toString() !== '')
		items.push({ FilterName: "Order", FilterType: FilterType.eq, FilterValue: this.orderFilter });
				  
			if (this.lastUpdateTimeFromFilter !== undefined && this.lastUpdateTimeFromFilter !== null && this.lastUpdateTimeFromFilter.toString() !== '')
				items.push({ FilterName: "LastUpdateTime", FilterType: FilterType.ge, FilterValue: moment(this.lastUpdateTimeFromFilter).format("YYYY/MM/DD")  });
			if (this.lastUpdateTimeToFilter !== undefined && this.lastUpdateTimeToFilter !== null && this.lastUpdateTimeToFilter.toString() !== '')
				items.push({ FilterName: "LastUpdateTime", FilterType: FilterType.le, FilterValue: moment(this.lastUpdateTimeToFilter).format("YYYY/MM/DD")  });
								        if (this.isRealFilter !== undefined && this.isRealFilter !== null && this.isRealFilter.toString() !== '')
		items.push({ FilterName: "IsReal", FilterType: FilterType.eq, FilterValue: this.isRealFilter });
				        if (this.isNewFilter !== undefined && this.isNewFilter !== null && this.isNewFilter.toString() !== '')
		items.push({ FilterName: "IsNew", FilterType: FilterType.eq, FilterValue: this.isNewFilter });
				        if (this.subCodeFilter !== undefined && this.subCodeFilter !== null && this.subCodeFilter.toString() !== '')
        items.push({ FilterName: "SubCode", FilterType: FilterType.like, FilterValue: this.subCodeFilter });
						        if (this.phaseIdFilter !== undefined && this.phaseIdFilter !== null && this.phaseIdFilter.toString() !== '')
        items.push({ FilterName: "PhaseId", FilterType: FilterType.like, FilterValue: this.phaseIdFilter });
						        if (this.creationPhaseIdFilter !== undefined && this.creationPhaseIdFilter !== null && this.creationPhaseIdFilter.toString() !== '')
        items.push({ FilterName: "CreationPhaseId", FilterType: FilterType.like, FilterValue: this.creationPhaseIdFilter });
						        if (this.deletionPhaseIdFilter !== undefined && this.deletionPhaseIdFilter !== null && this.deletionPhaseIdFilter.toString() !== '')
        items.push({ FilterName: "DeletionPhaseId", FilterType: FilterType.like, FilterValue: this.deletionPhaseIdFilter });
						        if (this.gISUniqueCodeFilter !== undefined && this.gISUniqueCodeFilter !== null && this.gISUniqueCodeFilter.toString() !== '')
        items.push({ FilterName: "GISUniqueCode", FilterType: FilterType.like, FilterValue: this.gISUniqueCodeFilter });
						        if (this.skipReasonFilter !== undefined && this.skipReasonFilter !== null && this.skipReasonFilter.toString() !== '')
		items.push({ FilterName: "SkipReason", FilterType: FilterType.eq, FilterValue: this.skipReasonFilter });
				        if (this.skipCommentFilter !== undefined && this.skipCommentFilter !== null && this.skipCommentFilter.toString() !== '')
        items.push({ FilterName: "SkipComment", FilterType: FilterType.like, FilterValue: this.skipCommentFilter });
						        if (this.calledByCallCenterFilter !== undefined && this.calledByCallCenterFilter !== null && this.calledByCallCenterFilter.toString() !== '')
		items.push({ FilterName: "CalledByCallCenter", FilterType: FilterType.eq, FilterValue: this.calledByCallCenterFilter });
				        if (this.callCenterCommentFilter !== undefined && this.callCenterCommentFilter !== null && this.callCenterCommentFilter.toString() !== '')
        items.push({ FilterName: "CallCenterComment", FilterType: FilterType.like, FilterValue: this.callCenterCommentFilter });
						        if (this.similarityPercentageFilter !== undefined && this.similarityPercentageFilter !== null && this.similarityPercentageFilter.toString() !== '')
		items.push({ FilterName: "SimilarityPercentage", FilterType: FilterType.eq, FilterValue: this.similarityPercentageFilter });
				        if (this.isPulledFilter !== undefined && this.isPulledFilter !== null && this.isPulledFilter.toString() !== '')
		items.push({ FilterName: "IsPulled", FilterType: FilterType.eq, FilterValue: this.isPulledFilter });
				        if (this.codeToPartitionFilter !== undefined && this.codeToPartitionFilter !== null && this.codeToPartitionFilter.toString() !== '')
		items.push({ FilterName: "CodeToPartition", FilterType: FilterType.eq, FilterValue: this.codeToPartitionFilter });
				        if (this.sourceFilter !== undefined && this.sourceFilter !== null && this.sourceFilter.toString() !== '')
		items.push({ FilterName: "Source", FilterType: FilterType.eq, FilterValue: this.sourceFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.responseFormModal.show();
    }

    edit(item: ResponseDto): void {
        this.responseFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}