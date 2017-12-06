import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { UsersAssignmentServiceProxy, UsersAssignmentDto, PagedResultDtoOfUsersAssignmentDto } from '@shared/service-proxies/service-proxies';
import { UsersAssignmentFormComponent } from "app/users-assignments/users-assignment-form/users-assignment-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'users-assignment',
    templateUrl: './users-assignments.component.html',
    animations: [appModuleAnimation()],
    providers: [
		UsersAssignmentServiceProxy,
	]
})
export class UsersAssignmentsComponent extends FilteredComponentBase<UsersAssignmentDto> {
	items: UsersAssignmentDto[] = [];

    @ViewChild('usersAssignmentFormModal') usersAssignmentFormModal: UsersAssignmentFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			domainCodeFilter: string;
			fromFilter: string;
			fromActualFilter: string;
			toFilter: string;
			toActualFilter: string;
			userCodeFilter: string;
			validInputFilter: boolean;
			invalidErrorFilter: string;
			iSValidFilter: boolean;
			lastUpdatedUserFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _usersAssignmentService: UsersAssignmentServiceProxy
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
			this._usersAssignmentService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfUsersAssignmentDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: UsersAssignmentDto): void {
        abp.message.confirm(
            'Delete Users assignment?',
            (result: boolean) => {
                if (result) {
                    this._usersAssignmentService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Users assignment: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.domainCodeFilter !== undefined && this.domainCodeFilter !== null && this.domainCodeFilter.toString() !== '')
        items.push({ FilterName: "DomainCode", FilterType: FilterType.like, FilterValue: this.domainCodeFilter });
						        if (this.fromFilter !== undefined && this.fromFilter !== null && this.fromFilter.toString() !== '')
        items.push({ FilterName: "From", FilterType: FilterType.like, FilterValue: this.fromFilter });
						        if (this.fromActualFilter !== undefined && this.fromActualFilter !== null && this.fromActualFilter.toString() !== '')
        items.push({ FilterName: "FromActual", FilterType: FilterType.like, FilterValue: this.fromActualFilter });
						        if (this.toFilter !== undefined && this.toFilter !== null && this.toFilter.toString() !== '')
        items.push({ FilterName: "To", FilterType: FilterType.like, FilterValue: this.toFilter });
						        if (this.toActualFilter !== undefined && this.toActualFilter !== null && this.toActualFilter.toString() !== '')
        items.push({ FilterName: "ToActual", FilterType: FilterType.like, FilterValue: this.toActualFilter });
						        if (this.userCodeFilter !== undefined && this.userCodeFilter !== null && this.userCodeFilter.toString() !== '')
        items.push({ FilterName: "UserCode", FilterType: FilterType.like, FilterValue: this.userCodeFilter });
						        if (this.validInputFilter !== undefined && this.validInputFilter !== null && this.validInputFilter.toString() !== '')
		items.push({ FilterName: "ValidInput", FilterType: FilterType.eq, FilterValue: this.validInputFilter });
				        if (this.invalidErrorFilter !== undefined && this.invalidErrorFilter !== null && this.invalidErrorFilter.toString() !== '')
        items.push({ FilterName: "InvalidError", FilterType: FilterType.like, FilterValue: this.invalidErrorFilter });
						        if (this.iSValidFilter !== undefined && this.iSValidFilter !== null && this.iSValidFilter.toString() !== '')
		items.push({ FilterName: "ISValid", FilterType: FilterType.eq, FilterValue: this.iSValidFilter });
				        if (this.lastUpdatedUserFilter !== undefined && this.lastUpdatedUserFilter !== null && this.lastUpdatedUserFilter.toString() !== '')
        items.push({ FilterName: "LastUpdatedUser", FilterType: FilterType.like, FilterValue: this.lastUpdatedUserFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.usersAssignmentFormModal.show();
    }

    edit(item: UsersAssignmentDto): void {
        this.usersAssignmentFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}