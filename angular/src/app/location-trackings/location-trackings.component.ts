import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { LocationTrackingServiceProxy, LocationTrackingDto, PagedResultDtoOfLocationTrackingDto } from '@shared/service-proxies/service-proxies';
import { LocationTrackingFormComponent } from "app/location-trackings/location-tracking-form/location-tracking-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'location-tracking',
    templateUrl: './location-trackings.component.html',
    animations: [appModuleAnimation()],
    providers: [
		LocationTrackingServiceProxy,
	]
})
export class LocationTrackingsComponent extends FilteredComponentBase<LocationTrackingDto> {
	items: LocationTrackingDto[] = [];

    @ViewChild('locationTrackingFormModal') locationTrackingFormModal: LocationTrackingFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			objectIdFilter: string;
			timeFromFilter: moment.Moment=null;
	timeToFilter: moment.Moment=null;
					isInAreaFilter: boolean;
			isLastFilter: boolean;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _locationTrackingService: LocationTrackingServiceProxy
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
			this._locationTrackingService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfLocationTrackingDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: LocationTrackingDto): void {
        abp.message.confirm(
            'Delete Location tracking?',
            (result: boolean) => {
                if (result) {
                    this._locationTrackingService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Location tracking: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.objectIdFilter !== undefined && this.objectIdFilter !== null && this.objectIdFilter.toString() !== '')
        items.push({ FilterName: "ObjectId", FilterType: FilterType.like, FilterValue: this.objectIdFilter });
						  
			if (this.timeFromFilter !== undefined && this.timeFromFilter !== null && this.timeFromFilter.toString() !== '')
				items.push({ FilterName: "Time", FilterType: FilterType.ge, FilterValue: moment(this.timeFromFilter).format("YYYY/MM/DD")  });
			if (this.timeToFilter !== undefined && this.timeToFilter !== null && this.timeToFilter.toString() !== '')
				items.push({ FilterName: "Time", FilterType: FilterType.le, FilterValue: moment(this.timeToFilter).format("YYYY/MM/DD")  });
								        if (this.isInAreaFilter !== undefined && this.isInAreaFilter !== null && this.isInAreaFilter.toString() !== '')
		items.push({ FilterName: "IsInArea", FilterType: FilterType.eq, FilterValue: this.isInAreaFilter });
				        if (this.isLastFilter !== undefined && this.isLastFilter !== null && this.isLastFilter.toString() !== '')
		items.push({ FilterName: "IsLast", FilterType: FilterType.eq, FilterValue: this.isLastFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.locationTrackingFormModal.show();
    }

    edit(item: LocationTrackingDto): void {
        this.locationTrackingFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}