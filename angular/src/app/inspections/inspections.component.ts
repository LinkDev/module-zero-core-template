import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { InspectionServiceProxy, InspectionDto, PagedResultDtoOfInspectionDto } from '@shared/service-proxies/service-proxies';
import { PhaseServiceProxy, PhaseDto, PagedResultDtoOfPhaseDto } from '@shared/service-proxies/service-proxies';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { InspectionFormComponent } from "app/inspections/inspection-form/inspection-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'inspection',
    templateUrl: './inspections.component.html',
    animations: [appModuleAnimation()],
    providers: [
		InspectionServiceProxy,
		PhaseServiceProxy,
		DomainServiceProxy,
	]
})
export class InspectionsComponent extends FilteredComponentBase<InspectionDto> {
	items: InspectionDto[] = [];

    @ViewChild('inspectionFormModal') inspectionFormModal: InspectionFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			inspectorIdFilter: string;
			userIdFilter: string;
			dateFromFilter: moment.Moment=null;
	dateToFilter: moment.Moment=null;
				ratingFilter: number;
			commentsFilter: string;
			phaseIdFilter: string;
	phaseIdList: PhaseDto[] = null;
			domainIdFilter: string;
	domainIdList: DomainDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _inspectionService: InspectionServiceProxy
			, private _phaseService: PhaseServiceProxy
			, private _domainService: DomainServiceProxy
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
			this._inspectionService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfInspectionDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: InspectionDto): void {
        abp.message.confirm(
            'Delete Inspection?',
            (result: boolean) => {
                if (result) {
                    this._inspectionService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Inspection: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.inspectorIdFilter !== undefined && this.inspectorIdFilter !== null && this.inspectorIdFilter.toString() !== '')
        items.push({ FilterName: "InspectorId", FilterType: FilterType.like, FilterValue: this.inspectorIdFilter });
						        if (this.userIdFilter !== undefined && this.userIdFilter !== null && this.userIdFilter.toString() !== '')
        items.push({ FilterName: "UserId", FilterType: FilterType.like, FilterValue: this.userIdFilter });
						  
			if (this.dateFromFilter !== undefined && this.dateFromFilter !== null && this.dateFromFilter.toString() !== '')
				items.push({ FilterName: "Date", FilterType: FilterType.ge, FilterValue: moment(this.dateFromFilter).format("YYYY/MM/DD")  });
			if (this.dateToFilter !== undefined && this.dateToFilter !== null && this.dateToFilter.toString() !== '')
				items.push({ FilterName: "Date", FilterType: FilterType.le, FilterValue: moment(this.dateToFilter).format("YYYY/MM/DD")  });
						        if (this.ratingFilter !== undefined && this.ratingFilter !== null && this.ratingFilter.toString() !== '')
		items.push({ FilterName: "Rating", FilterType: FilterType.eq, FilterValue: this.ratingFilter });
				        if (this.commentsFilter !== undefined && this.commentsFilter !== null && this.commentsFilter.toString() !== '')
        items.push({ FilterName: "Comments", FilterType: FilterType.like, FilterValue: this.commentsFilter });
						        if (this.phaseIdFilter !== undefined && this.phaseIdFilter !== null && this.phaseIdFilter.toString() !== '')
		items.push({ FilterName: "PhaseId", FilterType: FilterType.in, FilterValue: this.phaseIdFilter });
				        if (this.domainIdFilter !== undefined && this.domainIdFilter !== null && this.domainIdFilter.toString() !== '')
		items.push({ FilterName: "DomainId", FilterType: FilterType.in, FilterValue: this.domainIdFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.inspectionFormModal.show();
    }

    edit(item: InspectionDto): void {
        this.inspectionFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}