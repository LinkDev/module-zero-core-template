import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { UserProfilesProgressServiceProxy, UserProfilesProgressDto, PagedResultDtoOfUserProfilesProgressDto } from '@shared/service-proxies/service-proxies';
import { UserProfilesProgressFormComponent } from "app/user-profiles-progresses/user-profiles-progress-form/user-profiles-progress-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'user-profiles-progress',
    templateUrl: './user-profiles-progresses.component.html',
    animations: [appModuleAnimation()],
    providers: [
		UserProfilesProgressServiceProxy,
	]
})
export class UserProfilesProgressesComponent extends FilteredComponentBase<UserProfilesProgressDto> {
	items: UserProfilesProgressDto[] = [];

    @ViewChild('userProfilesProgressFormModal') userProfilesProgressFormModal: UserProfilesProgressFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			userProfileIdFilter: string;
			isActiveFilter: boolean;
			userIdFilter: string;
			userNameFilter: string;
			userCodeFilter: string;
			managerIdFilter: string;
			surveyIdFilter: string;
			countFilter: number;
			creationPhaseIdFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _userProfilesProgressService: UserProfilesProgressServiceProxy
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
			this._userProfilesProgressService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfUserProfilesProgressDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: UserProfilesProgressDto): void {
        abp.message.confirm(
            'Delete User profiles progress?',
            (result: boolean) => {
                if (result) {
                    this._userProfilesProgressService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted User profiles progress: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.userProfileIdFilter !== undefined && this.userProfileIdFilter !== null && this.userProfileIdFilter.toString() !== '')
        items.push({ FilterName: "UserProfileId", FilterType: FilterType.like, FilterValue: this.userProfileIdFilter });
						        if (this.isActiveFilter !== undefined && this.isActiveFilter !== null && this.isActiveFilter.toString() !== '')
		items.push({ FilterName: "IsActive", FilterType: FilterType.eq, FilterValue: this.isActiveFilter });
				        if (this.userIdFilter !== undefined && this.userIdFilter !== null && this.userIdFilter.toString() !== '')
        items.push({ FilterName: "UserId", FilterType: FilterType.like, FilterValue: this.userIdFilter });
						        if (this.userNameFilter !== undefined && this.userNameFilter !== null && this.userNameFilter.toString() !== '')
        items.push({ FilterName: "UserName", FilterType: FilterType.like, FilterValue: this.userNameFilter });
						        if (this.userCodeFilter !== undefined && this.userCodeFilter !== null && this.userCodeFilter.toString() !== '')
        items.push({ FilterName: "UserCode", FilterType: FilterType.like, FilterValue: this.userCodeFilter });
						        if (this.managerIdFilter !== undefined && this.managerIdFilter !== null && this.managerIdFilter.toString() !== '')
        items.push({ FilterName: "ManagerId", FilterType: FilterType.like, FilterValue: this.managerIdFilter });
						        if (this.surveyIdFilter !== undefined && this.surveyIdFilter !== null && this.surveyIdFilter.toString() !== '')
        items.push({ FilterName: "SurveyId", FilterType: FilterType.like, FilterValue: this.surveyIdFilter });
						        if (this.countFilter !== undefined && this.countFilter !== null && this.countFilter.toString() !== '')
		items.push({ FilterName: "Count", FilterType: FilterType.eq, FilterValue: this.countFilter });
				        if (this.creationPhaseIdFilter !== undefined && this.creationPhaseIdFilter !== null && this.creationPhaseIdFilter.toString() !== '')
        items.push({ FilterName: "CreationPhaseId", FilterType: FilterType.like, FilterValue: this.creationPhaseIdFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.userProfilesProgressFormModal.show();
    }

    edit(item: UserProfilesProgressDto): void {
        this.userProfilesProgressFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}