import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { UserApplicationServiceProxy, UserApplicationDto, PagedResultDtoOfUserApplicationDto } from '@shared/service-proxies/service-proxies';
import { ApplicationServiceProxy, ApplicationDto, PagedResultDtoOfApplicationDto } from '@shared/service-proxies/service-proxies';
import { UserApplicationFormComponent } from "app/user-applications/user-application-form/user-application-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'user-application',
    templateUrl: './user-applications.component.html',
    animations: [appModuleAnimation()],
    providers: [
		UserApplicationServiceProxy,
		ApplicationServiceProxy,
	]
})
export class UserApplicationsComponent extends FilteredComponentBase<UserApplicationDto> {
	items: UserApplicationDto[] = [];

    @ViewChild('userApplicationFormModal') userApplicationFormModal: UserApplicationFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			applicationIdFilter: string;
	applicationIdList: ApplicationDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _userApplicationService: UserApplicationServiceProxy
			, private _applicationService: ApplicationServiceProxy
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
			this._userApplicationService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfUserApplicationDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: UserApplicationDto): void {
        abp.message.confirm(
            'Delete User application?',
            (result: boolean) => {
                if (result) {
                    this._userApplicationService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted User application: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.userApplicationFormModal.show();
    }

    edit(item: UserApplicationDto): void {
        this.userApplicationFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}