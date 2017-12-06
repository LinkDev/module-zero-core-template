import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { PhaseServiceProxy, PhaseDto, PagedResultDtoOfPhaseDto } from '@shared/service-proxies/service-proxies';
import { ApplicationServiceProxy, ApplicationDto, PagedResultDtoOfApplicationDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupServiceProxy, DomainGroupDto, PagedResultDtoOfDomainGroupDto } from '@shared/service-proxies/service-proxies';
import { PhaseFormComponent } from "app/phases/phase-form/phase-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'phase',
    templateUrl: './phases.component.html',
    animations: [appModuleAnimation()],
    providers: [
		PhaseServiceProxy,
		ApplicationServiceProxy,
		DomainGroupServiceProxy,
	]
})
export class PhasesComponent extends FilteredComponentBase<PhaseDto> {
	items: PhaseDto[] = [];

    @ViewChild('phaseFormModal') phaseFormModal: PhaseFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			applicationIdFilter: string;
	applicationIdList: ApplicationDto[] = null;
			fromFromFilter: moment.Moment=null;
	fromToFilter: moment.Moment=null;
				toFromFilter: moment.Moment=null;
	toToFilter: moment.Moment=null;
				orderFilter: number;
			isActiveFilter: boolean;
			baseDomainGroupIdFilter: string;
	baseDomainGroupIdList: DomainGroupDto[] = null;
			domainGroupIdFilter: string;
	domainGroupIdList: DomainGroupDto[] = null;
			defaultSurveyIdFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _phaseService: PhaseServiceProxy
			, private _applicationService: ApplicationServiceProxy
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
			this._phaseService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfPhaseDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: PhaseDto): void {
        abp.message.confirm(
            'Delete Phase?',
            (result: boolean) => {
                if (result) {
                    this._phaseService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Phase: ' + item.id);
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
						        if (this.applicationIdFilter !== undefined && this.applicationIdFilter !== null && this.applicationIdFilter.toString() !== '')
		items.push({ FilterName: "ApplicationId", FilterType: FilterType.in, FilterValue: this.applicationIdFilter });
				  
			if (this.fromFromFilter !== undefined && this.fromFromFilter !== null && this.fromFromFilter.toString() !== '')
				items.push({ FilterName: "From", FilterType: FilterType.ge, FilterValue: moment(this.fromFromFilter).format("YYYY/MM/DD")  });
			if (this.fromToFilter !== undefined && this.fromToFilter !== null && this.fromToFilter.toString() !== '')
				items.push({ FilterName: "From", FilterType: FilterType.le, FilterValue: moment(this.fromToFilter).format("YYYY/MM/DD")  });
						  
			if (this.toFromFilter !== undefined && this.toFromFilter !== null && this.toFromFilter.toString() !== '')
				items.push({ FilterName: "To", FilterType: FilterType.ge, FilterValue: moment(this.toFromFilter).format("YYYY/MM/DD")  });
			if (this.toToFilter !== undefined && this.toToFilter !== null && this.toToFilter.toString() !== '')
				items.push({ FilterName: "To", FilterType: FilterType.le, FilterValue: moment(this.toToFilter).format("YYYY/MM/DD")  });
						        if (this.orderFilter !== undefined && this.orderFilter !== null && this.orderFilter.toString() !== '')
		items.push({ FilterName: "Order", FilterType: FilterType.eq, FilterValue: this.orderFilter });
				        if (this.isActiveFilter !== undefined && this.isActiveFilter !== null && this.isActiveFilter.toString() !== '')
		items.push({ FilterName: "IsActive", FilterType: FilterType.eq, FilterValue: this.isActiveFilter });
				        if (this.baseDomainGroupIdFilter !== undefined && this.baseDomainGroupIdFilter !== null && this.baseDomainGroupIdFilter.toString() !== '')
		items.push({ FilterName: "BaseDomainGroupId", FilterType: FilterType.in, FilterValue: this.baseDomainGroupIdFilter });
				        if (this.domainGroupIdFilter !== undefined && this.domainGroupIdFilter !== null && this.domainGroupIdFilter.toString() !== '')
		items.push({ FilterName: "DomainGroupId", FilterType: FilterType.in, FilterValue: this.domainGroupIdFilter });
				        if (this.defaultSurveyIdFilter !== undefined && this.defaultSurveyIdFilter !== null && this.defaultSurveyIdFilter.toString() !== '')
        items.push({ FilterName: "DefaultSurveyId", FilterType: FilterType.like, FilterValue: this.defaultSurveyIdFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.phaseFormModal.show();
    }

    edit(item: PhaseDto): void {
        this.phaseFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}