import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { ApprovalStepServiceProxy, ApprovalStepDto, PagedResultDtoOfApprovalStepDto } from '@shared/service-proxies/service-proxies';
import { ApprovalStepFormComponent } from "app/approval-steps/approval-step-form/approval-step-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'approval-step',
    templateUrl: './approval-steps.component.html',
    animations: [appModuleAnimation()],
    providers: [
		ApprovalStepServiceProxy,
	]
})
export class ApprovalStepsComponent extends FilteredComponentBase<ApprovalStepDto> {
	items: ApprovalStepDto[] = [];

    @ViewChild('approvalStepFormModal') approvalStepFormModal: ApprovalStepFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			workflowIdFilter: string;
			orderFilter: number;
			roleIdFilter: string;
			groupIdFilter: string;
			isActiveFilter: boolean;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _approvalStepService: ApprovalStepServiceProxy
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
			this._approvalStepService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfApprovalStepDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: ApprovalStepDto): void {
        abp.message.confirm(
            'Delete Approval step?',
            (result: boolean) => {
                if (result) {
                    this._approvalStepService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Approval step: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.workflowIdFilter !== undefined && this.workflowIdFilter !== null && this.workflowIdFilter.toString() !== '')
        items.push({ FilterName: "WorkflowId", FilterType: FilterType.like, FilterValue: this.workflowIdFilter });
						        if (this.orderFilter !== undefined && this.orderFilter !== null && this.orderFilter.toString() !== '')
		items.push({ FilterName: "Order", FilterType: FilterType.eq, FilterValue: this.orderFilter });
				        if (this.roleIdFilter !== undefined && this.roleIdFilter !== null && this.roleIdFilter.toString() !== '')
        items.push({ FilterName: "RoleId", FilterType: FilterType.like, FilterValue: this.roleIdFilter });
						        if (this.groupIdFilter !== undefined && this.groupIdFilter !== null && this.groupIdFilter.toString() !== '')
        items.push({ FilterName: "GroupId", FilterType: FilterType.like, FilterValue: this.groupIdFilter });
						        if (this.isActiveFilter !== undefined && this.isActiveFilter !== null && this.isActiveFilter.toString() !== '')
		items.push({ FilterName: "IsActive", FilterType: FilterType.eq, FilterValue: this.isActiveFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.approvalStepFormModal.show();
    }

    edit(item: ApprovalStepDto): void {
        this.approvalStepFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}