import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QualityCallBackResponseServiceProxy, QualityCallBackResponseDto, PagedResultDtoOfQualityCallBackResponseDto } from '@shared/service-proxies/service-proxies';
import { QualityCallBackResponseFormComponent } from "app/quality-call-back-responses/quality-call-back-response-form/quality-call-back-response-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'quality-call-back-response',
    templateUrl: './quality-call-back-responses.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QualityCallBackResponseServiceProxy,
	]
})
export class QualityCallBackResponsesComponent extends FilteredComponentBase<QualityCallBackResponseDto> {
	items: QualityCallBackResponseDto[] = [];

    @ViewChild('qualityCallBackResponseFormModal') qualityCallBackResponseFormModal: QualityCallBackResponseFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			responseIdFilter: string;
			surveyIdFilter: string;
			userIdFilter: string;
			parentResponseIdFilter: string;
			startTimeFromFilter: moment.Moment=null;
	startTimeToFilter: moment.Moment=null;
				endTimeFromFilter: moment.Moment=null;
	endTimeToFilter: moment.Moment=null;
				codeFilter: string;
			domainIdFilter: string;
			statusFilter: number;
			titleFilter: string;
			lastUpdateTimeFromFilter: moment.Moment=null;
	lastUpdateTimeToFilter: moment.Moment=null;
				isRealFilter: boolean;
			phaseIdFilter: string;
			creationPhaseIdFilter: string;
			skipReasonFilter: number;
			skipCommentFilter: string;
			calledByCallCenterFilter: number;
			callCenterCommentFilter: string;
			similarityPercentageFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _qualityCallBackResponseService: QualityCallBackResponseServiceProxy
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
			this._qualityCallBackResponseService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQualityCallBackResponseDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QualityCallBackResponseDto): void {
        abp.message.confirm(
            'Delete Quality call back response?',
            (result: boolean) => {
                if (result) {
                    this._qualityCallBackResponseService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Quality call back response: ' + item.id);
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
        items.push({ FilterName: "SurveyId", FilterType: FilterType.like, FilterValue: this.surveyIdFilter });
						        if (this.userIdFilter !== undefined && this.userIdFilter !== null && this.userIdFilter.toString() !== '')
        items.push({ FilterName: "UserId", FilterType: FilterType.like, FilterValue: this.userIdFilter });
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
				        if (this.titleFilter !== undefined && this.titleFilter !== null && this.titleFilter.toString() !== '')
        items.push({ FilterName: "Title", FilterType: FilterType.like, FilterValue: this.titleFilter });
						  
			if (this.lastUpdateTimeFromFilter !== undefined && this.lastUpdateTimeFromFilter !== null && this.lastUpdateTimeFromFilter.toString() !== '')
				items.push({ FilterName: "LastUpdateTime", FilterType: FilterType.ge, FilterValue: moment(this.lastUpdateTimeFromFilter).format("YYYY/MM/DD")  });
			if (this.lastUpdateTimeToFilter !== undefined && this.lastUpdateTimeToFilter !== null && this.lastUpdateTimeToFilter.toString() !== '')
				items.push({ FilterName: "LastUpdateTime", FilterType: FilterType.le, FilterValue: moment(this.lastUpdateTimeToFilter).format("YYYY/MM/DD")  });
						        if (this.isRealFilter !== undefined && this.isRealFilter !== null && this.isRealFilter.toString() !== '')
		items.push({ FilterName: "IsReal", FilterType: FilterType.eq, FilterValue: this.isRealFilter });
				        if (this.phaseIdFilter !== undefined && this.phaseIdFilter !== null && this.phaseIdFilter.toString() !== '')
        items.push({ FilterName: "PhaseId", FilterType: FilterType.like, FilterValue: this.phaseIdFilter });
						        if (this.creationPhaseIdFilter !== undefined && this.creationPhaseIdFilter !== null && this.creationPhaseIdFilter.toString() !== '')
        items.push({ FilterName: "CreationPhaseId", FilterType: FilterType.like, FilterValue: this.creationPhaseIdFilter });
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

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.qualityCallBackResponseFormModal.show();
    }

    edit(item: QualityCallBackResponseDto): void {
        this.qualityCallBackResponseFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}