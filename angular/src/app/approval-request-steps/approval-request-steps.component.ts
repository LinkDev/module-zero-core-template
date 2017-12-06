import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { ApprovalRequestStepServiceProxy, ApprovalRequestStepDto, PagedResultDtoOfApprovalRequestStepDto } from '@shared/service-proxies/service-proxies';
import { ApprovalRequestServiceProxy, ApprovalRequestDto, PagedResultDtoOfApprovalRequestDto } from '@shared/service-proxies/service-proxies';
import { ApprovalStepServiceProxy, ApprovalStepDto, PagedResultDtoOfApprovalStepDto } from '@shared/service-proxies/service-proxies';
import { ApprovalRequestStepFormComponent } from "app/approval-request-steps/approval-request-step-form/approval-request-step-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'approval-request-step',
    templateUrl: './approval-request-steps.component.html',
    animations: [appModuleAnimation()],
    providers: [
		ApprovalRequestStepServiceProxy,
		ApprovalRequestServiceProxy,
		ApprovalStepServiceProxy,
	]
})
export class ApprovalRequestStepsComponent extends FilteredComponentBase<ApprovalRequestStepDto> {
	items: ApprovalRequestStepDto[] = [];

    @ViewChild('approvalRequestStepFormModal') approvalRequestStepFormModal: ApprovalRequestStepFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			approvalRequestIdFilter: string;
	approvalRequestIdList: ApprovalRequestDto[] = null;
			approvalStepIdFilter: string;
	approvalStepIdList: ApprovalStepDto[] = null;
			isApprovedFilter: boolean;
			dateApprovedFromFilter: moment.Moment=null;
	dateApprovedToFilter: moment.Moment=null;
				approvedByFilter: string;
			commentsFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _approvalRequestStepService: ApprovalRequestStepServiceProxy
			, private _approvalRequestService: ApprovalRequestServiceProxy
			, private _approvalStepService: ApprovalStepServiceProxy
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
			this._approvalRequestStepService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfApprovalRequestStepDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: ApprovalRequestStepDto): void {
        abp.message.confirm(
            'Delete Approval request step?',
            (result: boolean) => {
                if (result) {
                    this._approvalRequestStepService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Approval request step: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.approvalRequestIdFilter !== undefined && this.approvalRequestIdFilter !== null && this.approvalRequestIdFilter.toString() !== '')
		items.push({ FilterName: "ApprovalRequestId", FilterType: FilterType.in, FilterValue: this.approvalRequestIdFilter });
				        if (this.approvalStepIdFilter !== undefined && this.approvalStepIdFilter !== null && this.approvalStepIdFilter.toString() !== '')
		items.push({ FilterName: "ApprovalStepId", FilterType: FilterType.in, FilterValue: this.approvalStepIdFilter });
				        if (this.isApprovedFilter !== undefined && this.isApprovedFilter !== null && this.isApprovedFilter.toString() !== '')
		items.push({ FilterName: "IsApproved", FilterType: FilterType.eq, FilterValue: this.isApprovedFilter });
				  
			if (this.dateApprovedFromFilter !== undefined && this.dateApprovedFromFilter !== null && this.dateApprovedFromFilter.toString() !== '')
				items.push({ FilterName: "DateApproved", FilterType: FilterType.ge, FilterValue: moment(this.dateApprovedFromFilter).format("YYYY/MM/DD")  });
			if (this.dateApprovedToFilter !== undefined && this.dateApprovedToFilter !== null && this.dateApprovedToFilter.toString() !== '')
				items.push({ FilterName: "DateApproved", FilterType: FilterType.le, FilterValue: moment(this.dateApprovedToFilter).format("YYYY/MM/DD")  });
						        if (this.approvedByFilter !== undefined && this.approvedByFilter !== null && this.approvedByFilter.toString() !== '')
        items.push({ FilterName: "ApprovedBy", FilterType: FilterType.like, FilterValue: this.approvedByFilter });
						        if (this.commentsFilter !== undefined && this.commentsFilter !== null && this.commentsFilter.toString() !== '')
        items.push({ FilterName: "Comments", FilterType: FilterType.like, FilterValue: this.commentsFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.approvalRequestStepFormModal.show();
    }

    edit(item: ApprovalRequestStepDto): void {
        this.approvalRequestStepFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}