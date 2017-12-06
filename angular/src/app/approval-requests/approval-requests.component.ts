import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { ApprovalRequestServiceProxy, ApprovalRequestDto, PagedResultDtoOfApprovalRequestDto } from '@shared/service-proxies/service-proxies';
import { ApprovalStepServiceProxy, ApprovalStepDto, PagedResultDtoOfApprovalStepDto } from '@shared/service-proxies/service-proxies';
import { ApprovalRequestFormComponent } from "app/approval-requests/approval-request-form/approval-request-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'approval-request',
    templateUrl: './approval-requests.component.html',
    animations: [appModuleAnimation()],
    providers: [
		ApprovalRequestServiceProxy,
		ApprovalStepServiceProxy,
	]
})
export class ApprovalRequestsComponent extends FilteredComponentBase<ApprovalRequestDto> {
	items: ApprovalRequestDto[] = [];

    @ViewChild('approvalRequestFormModal') approvalRequestFormModal: ApprovalRequestFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			typeFilter: string;
			titleFilter: string;
			dateRequestedFromFilter: moment.Moment=null;
	dateRequestedToFilter: moment.Moment=null;
				requestedByFilter: string;
			contentIdFilter: string;
			actionFilter: string;
			routeDataFilter: string;
			approvalStepIdFilter: string;
	approvalStepIdList: ApprovalStepDto[] = null;
			isApprovedFilter: boolean;
			approvalActionFilter: string;
			rejectionActionFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _approvalRequestService: ApprovalRequestServiceProxy
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
			this._approvalRequestService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfApprovalRequestDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: ApprovalRequestDto): void {
        abp.message.confirm(
            'Delete Approval request?',
            (result: boolean) => {
                if (result) {
                    this._approvalRequestService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Approval request: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.typeFilter !== undefined && this.typeFilter !== null && this.typeFilter.toString() !== '')
        items.push({ FilterName: "Type", FilterType: FilterType.like, FilterValue: this.typeFilter });
						        if (this.titleFilter !== undefined && this.titleFilter !== null && this.titleFilter.toString() !== '')
        items.push({ FilterName: "Title", FilterType: FilterType.like, FilterValue: this.titleFilter });
						  
			if (this.dateRequestedFromFilter !== undefined && this.dateRequestedFromFilter !== null && this.dateRequestedFromFilter.toString() !== '')
				items.push({ FilterName: "DateRequested", FilterType: FilterType.ge, FilterValue: moment(this.dateRequestedFromFilter).format("YYYY/MM/DD")  });
			if (this.dateRequestedToFilter !== undefined && this.dateRequestedToFilter !== null && this.dateRequestedToFilter.toString() !== '')
				items.push({ FilterName: "DateRequested", FilterType: FilterType.le, FilterValue: moment(this.dateRequestedToFilter).format("YYYY/MM/DD")  });
						        if (this.requestedByFilter !== undefined && this.requestedByFilter !== null && this.requestedByFilter.toString() !== '')
        items.push({ FilterName: "RequestedBy", FilterType: FilterType.like, FilterValue: this.requestedByFilter });
						        if (this.contentIdFilter !== undefined && this.contentIdFilter !== null && this.contentIdFilter.toString() !== '')
        items.push({ FilterName: "ContentId", FilterType: FilterType.like, FilterValue: this.contentIdFilter });
						        if (this.actionFilter !== undefined && this.actionFilter !== null && this.actionFilter.toString() !== '')
        items.push({ FilterName: "Action", FilterType: FilterType.like, FilterValue: this.actionFilter });
						        if (this.routeDataFilter !== undefined && this.routeDataFilter !== null && this.routeDataFilter.toString() !== '')
        items.push({ FilterName: "RouteData", FilterType: FilterType.like, FilterValue: this.routeDataFilter });
						        if (this.approvalStepIdFilter !== undefined && this.approvalStepIdFilter !== null && this.approvalStepIdFilter.toString() !== '')
		items.push({ FilterName: "ApprovalStepId", FilterType: FilterType.in, FilterValue: this.approvalStepIdFilter });
				        if (this.isApprovedFilter !== undefined && this.isApprovedFilter !== null && this.isApprovedFilter.toString() !== '')
		items.push({ FilterName: "IsApproved", FilterType: FilterType.eq, FilterValue: this.isApprovedFilter });
				        if (this.approvalActionFilter !== undefined && this.approvalActionFilter !== null && this.approvalActionFilter.toString() !== '')
        items.push({ FilterName: "ApprovalAction", FilterType: FilterType.like, FilterValue: this.approvalActionFilter });
						        if (this.rejectionActionFilter !== undefined && this.rejectionActionFilter !== null && this.rejectionActionFilter.toString() !== '')
        items.push({ FilterName: "RejectionAction", FilterType: FilterType.like, FilterValue: this.rejectionActionFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.approvalRequestFormModal.show();
    }

    edit(item: ApprovalRequestDto): void {
        this.approvalRequestFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}