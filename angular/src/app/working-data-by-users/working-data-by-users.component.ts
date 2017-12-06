import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { WorkingDataByUserServiceProxy, WorkingDataByUserDto, PagedResultDtoOfWorkingDataByUserDto } from '@shared/service-proxies/service-proxies';
import { WorkingDataByUserFormComponent } from "app/working-data-by-users/working-data-by-user-form/working-data-by-user-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'working-data-by-user',
    templateUrl: './working-data-by-users.component.html',
    animations: [appModuleAnimation()],
    providers: [
		WorkingDataByUserServiceProxy,
	]
})
export class WorkingDataByUsersComponent extends FilteredComponentBase<WorkingDataByUserDto> {
	items: WorkingDataByUserDto[] = [];

    @ViewChild('workingDataByUserFormModal') workingDataByUserFormModal: WorkingDataByUserFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			userIdFilter: string;
			userNameFilter: string;
			userCodeFilter: string;
			managerIdFilter: string;
			completedSurveysFilter: number;
			workingHoursFilter: number;
			dateFromFilter: moment.Moment=null;
	dateToFilter: moment.Moment=null;
				phaseIdFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _workingDataByUserService: WorkingDataByUserServiceProxy
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
			this._workingDataByUserService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfWorkingDataByUserDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: WorkingDataByUserDto): void {
        abp.message.confirm(
            'Delete Working data by user?',
            (result: boolean) => {
                if (result) {
                    this._workingDataByUserService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Working data by user: ' + item.id);
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
						        if (this.userNameFilter !== undefined && this.userNameFilter !== null && this.userNameFilter.toString() !== '')
        items.push({ FilterName: "UserName", FilterType: FilterType.like, FilterValue: this.userNameFilter });
						        if (this.userCodeFilter !== undefined && this.userCodeFilter !== null && this.userCodeFilter.toString() !== '')
        items.push({ FilterName: "UserCode", FilterType: FilterType.like, FilterValue: this.userCodeFilter });
						        if (this.managerIdFilter !== undefined && this.managerIdFilter !== null && this.managerIdFilter.toString() !== '')
        items.push({ FilterName: "ManagerId", FilterType: FilterType.like, FilterValue: this.managerIdFilter });
						        if (this.completedSurveysFilter !== undefined && this.completedSurveysFilter !== null && this.completedSurveysFilter.toString() !== '')
		items.push({ FilterName: "CompletedSurveys", FilterType: FilterType.eq, FilterValue: this.completedSurveysFilter });
				        if (this.workingHoursFilter !== undefined && this.workingHoursFilter !== null && this.workingHoursFilter.toString() !== '')
		items.push({ FilterName: "WorkingHours", FilterType: FilterType.eq, FilterValue: this.workingHoursFilter });
				  
			if (this.dateFromFilter !== undefined && this.dateFromFilter !== null && this.dateFromFilter.toString() !== '')
				items.push({ FilterName: "Date", FilterType: FilterType.ge, FilterValue: moment(this.dateFromFilter).format("YYYY/MM/DD")  });
			if (this.dateToFilter !== undefined && this.dateToFilter !== null && this.dateToFilter.toString() !== '')
				items.push({ FilterName: "Date", FilterType: FilterType.le, FilterValue: moment(this.dateToFilter).format("YYYY/MM/DD")  });
						        if (this.phaseIdFilter !== undefined && this.phaseIdFilter !== null && this.phaseIdFilter.toString() !== '')
        items.push({ FilterName: "PhaseId", FilterType: FilterType.like, FilterValue: this.phaseIdFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.workingDataByUserFormModal.show();
    }

    edit(item: WorkingDataByUserDto): void {
        this.workingDataByUserFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}