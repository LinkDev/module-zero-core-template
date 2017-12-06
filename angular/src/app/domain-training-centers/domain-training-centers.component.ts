import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { DomainTrainingCenterServiceProxy, DomainTrainingCenterDto, PagedResultDtoOfDomainTrainingCenterDto } from '@shared/service-proxies/service-proxies';
import { TrainingCenterServiceProxy, TrainingCenterDto, PagedResultDtoOfTrainingCenterDto } from '@shared/service-proxies/service-proxies';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { DomainTrainingCenterFormComponent } from "app/domain-training-centers/domain-training-center-form/domain-training-center-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'domain-training-center',
    templateUrl: './domain-training-centers.component.html',
    animations: [appModuleAnimation()],
    providers: [
		DomainTrainingCenterServiceProxy,
		TrainingCenterServiceProxy,
		DomainServiceProxy,
	]
})
export class DomainTrainingCentersComponent extends FilteredComponentBase<DomainTrainingCenterDto> {
	items: DomainTrainingCenterDto[] = [];

    @ViewChild('domainTrainingCenterFormModal') domainTrainingCenterFormModal: DomainTrainingCenterFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			trainingCenterIdFilter: string;
	trainingCenterIdList: TrainingCenterDto[] = null;
			domainIdFilter: string;
	domainIdList: DomainDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _domainTrainingCenterService: DomainTrainingCenterServiceProxy
			, private _trainingCenterService: TrainingCenterServiceProxy
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
			this._domainTrainingCenterService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfDomainTrainingCenterDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: DomainTrainingCenterDto): void {
        abp.message.confirm(
            'Delete Domain training center?',
            (result: boolean) => {
                if (result) {
                    this._domainTrainingCenterService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Domain training center: ' + item.id);
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
        this.domainTrainingCenterFormModal.show();
    }

    edit(item: DomainTrainingCenterDto): void {
        this.domainTrainingCenterFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}