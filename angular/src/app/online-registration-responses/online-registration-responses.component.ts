import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { OnlineRegistrationResponseServiceProxy, OnlineRegistrationResponseDto, PagedResultDtoOfOnlineRegistrationResponseDto } from '@shared/service-proxies/service-proxies';
import { OnlineRegistrationResponseFormComponent } from "app/online-registration-responses/online-registration-response-form/online-registration-response-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'online-registration-response',
    templateUrl: './online-registration-responses.component.html',
    animations: [appModuleAnimation()],
    providers: [
		OnlineRegistrationResponseServiceProxy,
	]
})
export class OnlineRegistrationResponsesComponent extends FilteredComponentBase<OnlineRegistrationResponseDto> {
	items: OnlineRegistrationResponseDto[] = [];

    @ViewChild('onlineRegistrationResponseFormModal') onlineRegistrationResponseFormModal: OnlineRegistrationResponseFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nationalIdFilter: string;
			phoneNumberFilter: string;
			codeFilter: string;
			unitTypeFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _onlineRegistrationResponseService: OnlineRegistrationResponseServiceProxy
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
			this._onlineRegistrationResponseService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfOnlineRegistrationResponseDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: OnlineRegistrationResponseDto): void {
        abp.message.confirm(
            'Delete Online registration response?',
            (result: boolean) => {
                if (result) {
                    this._onlineRegistrationResponseService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Online registration response: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.nationalIdFilter !== undefined && this.nationalIdFilter !== null && this.nationalIdFilter.toString() !== '')
        items.push({ FilterName: "NationalId", FilterType: FilterType.like, FilterValue: this.nationalIdFilter });
						        if (this.phoneNumberFilter !== undefined && this.phoneNumberFilter !== null && this.phoneNumberFilter.toString() !== '')
        items.push({ FilterName: "PhoneNumber", FilterType: FilterType.like, FilterValue: this.phoneNumberFilter });
						        if (this.codeFilter !== undefined && this.codeFilter !== null && this.codeFilter.toString() !== '')
        items.push({ FilterName: "Code", FilterType: FilterType.like, FilterValue: this.codeFilter });
						        if (this.unitTypeFilter !== undefined && this.unitTypeFilter !== null && this.unitTypeFilter.toString() !== '')
        items.push({ FilterName: "UnitType", FilterType: FilterType.like, FilterValue: this.unitTypeFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.onlineRegistrationResponseFormModal.show();
    }

    edit(item: OnlineRegistrationResponseDto): void {
        this.onlineRegistrationResponseFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}