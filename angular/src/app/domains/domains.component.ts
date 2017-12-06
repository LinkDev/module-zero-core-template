import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupServiceProxy, DomainGroupDto, PagedResultDtoOfDomainGroupDto } from '@shared/service-proxies/service-proxies';
import { DomainFormComponent } from "app/domains/domain-form/domain-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'domain',
    templateUrl: './domains.component.html',
    animations: [appModuleAnimation()],
    providers: [
		DomainServiceProxy,
		DomainGroupServiceProxy,
	]
})
export class DomainsComponent extends FilteredComponentBase<DomainDto> {
	items: DomainDto[] = [];

    @ViewChild('domainFormModal') domainFormModal: DomainFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			codeFilter: string;
			parentDomainIdFilter: string;
	parentDomainIdList: DomainDto[] = null;
			domainGroupIdFilter: string;
	domainGroupIdList: DomainGroupDto[] = null;
			uRFilter: number;
			nameHierachyFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _domainService: DomainServiceProxy
			, private _domainGroupService: DomainGroupServiceProxy
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
			this._domainService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfDomainDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: DomainDto): void {
        abp.message.confirm(
            'Delete Domain?',
            (result: boolean) => {
                if (result) {
                    this._domainService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Domain: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.nameFilter !== undefined && this.nameFilter !== null && this.nameFilter.toString() !== '')
        items.push({ FilterName: "Name", FilterType: FilterType.like, FilterValue: this.nameFilter });
						        if (this.codeFilter !== undefined && this.codeFilter !== null && this.codeFilter.toString() !== '')
        items.push({ FilterName: "Code", FilterType: FilterType.like, FilterValue: this.codeFilter });
						        if (this.parentDomainIdFilter !== undefined && this.parentDomainIdFilter !== null && this.parentDomainIdFilter.toString() !== '')
		items.push({ FilterName: "ParentDomainId", FilterType: FilterType.in, FilterValue: this.parentDomainIdFilter });
				        if (this.domainGroupIdFilter !== undefined && this.domainGroupIdFilter !== null && this.domainGroupIdFilter.toString() !== '')
		items.push({ FilterName: "DomainGroupId", FilterType: FilterType.in, FilterValue: this.domainGroupIdFilter });
				        if (this.uRFilter !== undefined && this.uRFilter !== null && this.uRFilter.toString() !== '')
		items.push({ FilterName: "UR", FilterType: FilterType.eq, FilterValue: this.uRFilter });
				        if (this.nameHierachyFilter !== undefined && this.nameHierachyFilter !== null && this.nameHierachyFilter.toString() !== '')
        items.push({ FilterName: "NameHierachy", FilterType: FilterType.like, FilterValue: this.nameHierachyFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.domainFormModal.show();
    }

    edit(item: DomainDto): void {
        this.domainFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}