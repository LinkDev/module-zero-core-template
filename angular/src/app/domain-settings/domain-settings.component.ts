import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { DomainSettingServiceProxy, DomainSettingDto, PagedResultDtoOfDomainSettingDto } from '@shared/service-proxies/service-proxies';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { SurveyServiceProxy, SurveyDto, PagedResultDtoOfSurveyDto } from '@shared/service-proxies/service-proxies';
import { DomainSettingFormComponent } from "app/domain-settings/domain-setting-form/domain-setting-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'domain-setting',
    templateUrl: './domain-settings.component.html',
    animations: [appModuleAnimation()],
    providers: [
		DomainSettingServiceProxy,
		DomainServiceProxy,
		SurveyServiceProxy,
	]
})
export class DomainSettingsComponent extends FilteredComponentBase<DomainSettingDto> {
	items: DomainSettingDto[] = [];

    @ViewChild('domainSettingFormModal') domainSettingFormModal: DomainSettingFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			domainIdFilter: string;
	domainIdList: DomainDto[] = null;
			surveyIdFilter: string;
	surveyIdList: SurveyDto[] = null;
			keyFilter: string;
			valueFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _domainSettingService: DomainSettingServiceProxy
			, private _domainService: DomainServiceProxy
			, private _surveyService: SurveyServiceProxy
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
			this._domainSettingService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfDomainSettingDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: DomainSettingDto): void {
        abp.message.confirm(
            'Delete Domain setting?',
            (result: boolean) => {
                if (result) {
                    this._domainSettingService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Domain setting: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.domainIdFilter !== undefined && this.domainIdFilter !== null && this.domainIdFilter.toString() !== '')
		items.push({ FilterName: "DomainId", FilterType: FilterType.in, FilterValue: this.domainIdFilter });
				        if (this.surveyIdFilter !== undefined && this.surveyIdFilter !== null && this.surveyIdFilter.toString() !== '')
		items.push({ FilterName: "SurveyId", FilterType: FilterType.in, FilterValue: this.surveyIdFilter });
				        if (this.keyFilter !== undefined && this.keyFilter !== null && this.keyFilter.toString() !== '')
        items.push({ FilterName: "Key", FilterType: FilterType.like, FilterValue: this.keyFilter });
						        if (this.valueFilter !== undefined && this.valueFilter !== null && this.valueFilter.toString() !== '')
        items.push({ FilterName: "Value", FilterType: FilterType.like, FilterValue: this.valueFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.domainSettingFormModal.show();
    }

    edit(item: DomainSettingDto): void {
        this.domainSettingFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}