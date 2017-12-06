import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { UserDomainServiceProxy, UserDomainDto, PagedResultDtoOfUserDomainDto } from '@shared/service-proxies/service-proxies';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { ApplicationServiceProxy, ApplicationDto, PagedResultDtoOfApplicationDto } from '@shared/service-proxies/service-proxies';
import { UserDomainFormComponent } from "app/user-domains/user-domain-form/user-domain-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'user-domain',
    templateUrl: './user-domains.component.html',
    animations: [appModuleAnimation()],
    providers: [
		UserDomainServiceProxy,
		DomainServiceProxy,
		ApplicationServiceProxy,
	]
})
export class UserDomainsComponent extends FilteredComponentBase<UserDomainDto> {
	items: UserDomainDto[] = [];

    @ViewChild('userDomainFormModal') userDomainFormModal: UserDomainFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			domainIdFilter: string;
	domainIdList: DomainDto[] = null;
			applicationIdFilter: string;
	applicationIdList: ApplicationDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _userDomainService: UserDomainServiceProxy
			, private _domainService: DomainServiceProxy
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
			this._userDomainService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfUserDomainDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: UserDomainDto): void {
        abp.message.confirm(
            'Delete User domain?',
            (result: boolean) => {
                if (result) {
                    this._userDomainService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted User domain: ' + item.id);
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
        this.userDomainFormModal.show();
    }

    edit(item: UserDomainDto): void {
        this.userDomainFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}