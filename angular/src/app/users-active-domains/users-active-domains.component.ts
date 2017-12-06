import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { UsersActiveDomainServiceProxy, UsersActiveDomainDto, PagedResultDtoOfUsersActiveDomainDto } from '@shared/service-proxies/service-proxies';
import { UsersActiveDomainFormComponent } from "app/users-active-domains/users-active-domain-form/users-active-domain-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'users-active-domain',
    templateUrl: './users-active-domains.component.html',
    animations: [appModuleAnimation()],
    providers: [
		UsersActiveDomainServiceProxy,
	]
})
export class UsersActiveDomainsComponent extends FilteredComponentBase<UsersActiveDomainDto> {
	items: UsersActiveDomainDto[] = [];

    @ViewChild('usersActiveDomainFormModal') usersActiveDomainFormModal: UsersActiveDomainFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _usersActiveDomainService: UsersActiveDomainServiceProxy
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
			this._usersActiveDomainService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfUsersActiveDomainDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: UsersActiveDomainDto): void {
        abp.message.confirm(
            'Delete Users active domain?',
            (result: boolean) => {
                if (result) {
                    this._usersActiveDomainService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Users active domain: ' + item.id);
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
        this.usersActiveDomainFormModal.show();
    }

    edit(item: UsersActiveDomainDto): void {
        this.usersActiveDomainFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}