import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { UserProfileServiceProxy, UserProfileDto, PagedResultDtoOfUserProfileDto } from '@shared/service-proxies/service-proxies';
import { UserProfileFormComponent } from "app/user-profiles/user-profile-form/user-profile-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'user-profile',
    templateUrl: './user-profiles.component.html',
    animations: [appModuleAnimation()],
    providers: [
		UserProfileServiceProxy,
	]
})
export class UserProfilesComponent extends FilteredComponentBase<UserProfileDto> {
	items: UserProfileDto[] = [];

    @ViewChild('userProfileFormModal') userProfileFormModal: UserProfileFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			userIdFilter: string;
			fullNameFilter: string;
			nationalIdFilter: string;
			contractTypeFilter: number;
			paymentNumberFilter: string;
			bankNameFilter: number;
			bankAccountFilter: string;
			isActiveFilter: boolean;
			createdDateFromFilter: moment.Moment=null;
	createdDateToFilter: moment.Moment=null;
		constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _userProfileService: UserProfileServiceProxy
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
			this._userProfileService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfUserProfileDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: UserProfileDto): void {
        abp.message.confirm(
            'Delete User profile?',
            (result: boolean) => {
                if (result) {
                    this._userProfileService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted User profile: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.userIdFilter !== undefined && this.userIdFilter !== null && this.userIdFilter.toString() !== '')
        items.push({ FilterName: "UserId", FilterType: FilterType.like, FilterValue: this.userIdFilter });
						        if (this.fullNameFilter !== undefined && this.fullNameFilter !== null && this.fullNameFilter.toString() !== '')
        items.push({ FilterName: "FullName", FilterType: FilterType.like, FilterValue: this.fullNameFilter });
						        if (this.nationalIdFilter !== undefined && this.nationalIdFilter !== null && this.nationalIdFilter.toString() !== '')
        items.push({ FilterName: "NationalId", FilterType: FilterType.like, FilterValue: this.nationalIdFilter });
						        if (this.contractTypeFilter !== undefined && this.contractTypeFilter !== null && this.contractTypeFilter.toString() !== '')
		items.push({ FilterName: "ContractType", FilterType: FilterType.eq, FilterValue: this.contractTypeFilter });
				        if (this.paymentNumberFilter !== undefined && this.paymentNumberFilter !== null && this.paymentNumberFilter.toString() !== '')
        items.push({ FilterName: "PaymentNumber", FilterType: FilterType.like, FilterValue: this.paymentNumberFilter });
						        if (this.bankNameFilter !== undefined && this.bankNameFilter !== null && this.bankNameFilter.toString() !== '')
		items.push({ FilterName: "BankName", FilterType: FilterType.eq, FilterValue: this.bankNameFilter });
				        if (this.bankAccountFilter !== undefined && this.bankAccountFilter !== null && this.bankAccountFilter.toString() !== '')
        items.push({ FilterName: "BankAccount", FilterType: FilterType.like, FilterValue: this.bankAccountFilter });
						        if (this.isActiveFilter !== undefined && this.isActiveFilter !== null && this.isActiveFilter.toString() !== '')
		items.push({ FilterName: "IsActive", FilterType: FilterType.eq, FilterValue: this.isActiveFilter });
				  
			if (this.createdDateFromFilter !== undefined && this.createdDateFromFilter !== null && this.createdDateFromFilter.toString() !== '')
				items.push({ FilterName: "CreatedDate", FilterType: FilterType.ge, FilterValue: moment(this.createdDateFromFilter).format("YYYY/MM/DD")  });
			if (this.createdDateToFilter !== undefined && this.createdDateToFilter !== null && this.createdDateToFilter.toString() !== '')
				items.push({ FilterName: "CreatedDate", FilterType: FilterType.le, FilterValue: moment(this.createdDateToFilter).format("YYYY/MM/DD")  });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.userProfileFormModal.show();
    }

    edit(item: UserProfileDto): void {
        this.userProfileFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}