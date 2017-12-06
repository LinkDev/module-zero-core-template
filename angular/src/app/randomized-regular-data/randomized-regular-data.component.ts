import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { RandomizedRegularDatumServiceProxy, RandomizedRegularDatumDto, PagedResultDtoOfRandomizedRegularDatumDto } from '@shared/service-proxies/service-proxies';
import { RandomizedRegularDatumFormComponent } from "app/randomized-regular-data/randomized-regular-datum-form/randomized-regular-datum-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'randomized-regular-datum',
    templateUrl: './randomized-regular-data.component.html',
    animations: [appModuleAnimation()],
    providers: [
		RandomizedRegularDatumServiceProxy,
	]
})
export class RandomizedRegularDataComponent extends FilteredComponentBase<RandomizedRegularDatumDto> {
	items: RandomizedRegularDatumDto[] = [];

    @ViewChild('randomizedRegularDatumFormModal') randomizedRegularDatumFormModal: RandomizedRegularDatumFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			minRangeFilter: number;
			maxRangeFilter: number;
			percentageFilter: number;
			intervalFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _randomizedRegularDatumService: RandomizedRegularDatumServiceProxy
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
			this._randomizedRegularDatumService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfRandomizedRegularDatumDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: RandomizedRegularDatumDto): void {
        abp.message.confirm(
            'Delete Randomized regular datum?',
            (result: boolean) => {
                if (result) {
                    this._randomizedRegularDatumService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Randomized regular datum: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.minRangeFilter !== undefined && this.minRangeFilter !== null && this.minRangeFilter.toString() !== '')
		items.push({ FilterName: "MinRange", FilterType: FilterType.eq, FilterValue: this.minRangeFilter });
				        if (this.maxRangeFilter !== undefined && this.maxRangeFilter !== null && this.maxRangeFilter.toString() !== '')
		items.push({ FilterName: "MaxRange", FilterType: FilterType.eq, FilterValue: this.maxRangeFilter });
				        if (this.percentageFilter !== undefined && this.percentageFilter !== null && this.percentageFilter.toString() !== '')
		items.push({ FilterName: "Percentage", FilterType: FilterType.eq, FilterValue: this.percentageFilter });
				        if (this.intervalFilter !== undefined && this.intervalFilter !== null && this.intervalFilter.toString() !== '')
		items.push({ FilterName: "Interval", FilterType: FilterType.eq, FilterValue: this.intervalFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.randomizedRegularDatumFormModal.show();
    }

    edit(item: RandomizedRegularDatumDto): void {
        this.randomizedRegularDatumFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}