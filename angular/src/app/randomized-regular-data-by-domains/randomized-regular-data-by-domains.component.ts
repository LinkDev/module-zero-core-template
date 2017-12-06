import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { RandomizedRegularDataByDomainServiceProxy, RandomizedRegularDataByDomainDto, PagedResultDtoOfRandomizedRegularDataByDomainDto } from '@shared/service-proxies/service-proxies';
import { RandomizedRegularDataByDomainFormComponent } from "app/randomized-regular-data-by-domains/randomized-regular-data-by-domain-form/randomized-regular-data-by-domain-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'randomized-regular-data-by-domain',
    templateUrl: './randomized-regular-data-by-domains.component.html',
    animations: [appModuleAnimation()],
    providers: [
		RandomizedRegularDataByDomainServiceProxy,
	]
})
export class RandomizedRegularDataByDomainsComponent extends FilteredComponentBase<RandomizedRegularDataByDomainDto> {
	items: RandomizedRegularDataByDomainDto[] = [];

    @ViewChild('randomizedRegularDataByDomainFormModal') randomizedRegularDataByDomainFormModal: RandomizedRegularDataByDomainFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			domainCodeFilter: string;
			personsCountFilter: number;
			sampleIntervalFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _randomizedRegularDataByDomainService: RandomizedRegularDataByDomainServiceProxy
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
			this._randomizedRegularDataByDomainService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfRandomizedRegularDataByDomainDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: RandomizedRegularDataByDomainDto): void {
        abp.message.confirm(
            'Delete Randomized regular data by domain?',
            (result: boolean) => {
                if (result) {
                    this._randomizedRegularDataByDomainService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Randomized regular data by domain: ' + item.id);
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
						        if (this.personsCountFilter !== undefined && this.personsCountFilter !== null && this.personsCountFilter.toString() !== '')
		items.push({ FilterName: "PersonsCount", FilterType: FilterType.eq, FilterValue: this.personsCountFilter });
				        if (this.sampleIntervalFilter !== undefined && this.sampleIntervalFilter !== null && this.sampleIntervalFilter.toString() !== '')
		items.push({ FilterName: "SampleInterval", FilterType: FilterType.eq, FilterValue: this.sampleIntervalFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.randomizedRegularDataByDomainFormModal.show();
    }

    edit(item: RandomizedRegularDataByDomainDto): void {
        this.randomizedRegularDataByDomainFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}