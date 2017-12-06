import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { LogActionTypeServiceProxy, LogActionTypeDto, PagedResultDtoOfLogActionTypeDto } from '@shared/service-proxies/service-proxies';
import { LogActionTypeFormComponent } from "app/log-action-types/log-action-type-form/log-action-type-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'log-action-type',
    templateUrl: './log-action-types.component.html',
    animations: [appModuleAnimation()],
    providers: [
		LogActionTypeServiceProxy,
	]
})
export class LogActionTypesComponent extends FilteredComponentBase<LogActionTypeDto> {
	items: LogActionTypeDto[] = [];

    @ViewChild('logActionTypeFormModal') logActionTypeFormModal: LogActionTypeFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _logActionTypeService: LogActionTypeServiceProxy
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
			this._logActionTypeService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfLogActionTypeDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: LogActionTypeDto): void {
        abp.message.confirm(
            'Delete Log action type?',
            (result: boolean) => {
                if (result) {
                    this._logActionTypeService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Log action type: ' + item.id);
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
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.logActionTypeFormModal.show();
    }

    edit(item: LogActionTypeDto): void {
        this.logActionTypeFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}