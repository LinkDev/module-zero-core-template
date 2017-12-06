import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { ViolatedValidationRuleServiceProxy, ViolatedValidationRuleDto, PagedResultDtoOfViolatedValidationRuleDto } from '@shared/service-proxies/service-proxies';
import { ViolatedValidationRuleFormComponent } from "app/violated-validation-rules/violated-validation-rule-form/violated-validation-rule-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'violated-validation-rule',
    templateUrl: './violated-validation-rules.component.html',
    animations: [appModuleAnimation()],
    providers: [
		ViolatedValidationRuleServiceProxy,
	]
})
export class ViolatedValidationRulesComponent extends FilteredComponentBase<ViolatedValidationRuleDto> {
	items: ViolatedValidationRuleDto[] = [];

    @ViewChild('violatedValidationRuleFormModal') violatedValidationRuleFormModal: ViolatedValidationRuleFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			responseIdFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _violatedValidationRuleService: ViolatedValidationRuleServiceProxy
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
			this._violatedValidationRuleService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfViolatedValidationRuleDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: ViolatedValidationRuleDto): void {
        abp.message.confirm(
            'Delete Violated validation rule?',
            (result: boolean) => {
                if (result) {
                    this._violatedValidationRuleService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Violated validation rule: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.responseIdFilter !== undefined && this.responseIdFilter !== null && this.responseIdFilter.toString() !== '')
        items.push({ FilterName: "ResponseId", FilterType: FilterType.like, FilterValue: this.responseIdFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.violatedValidationRuleFormModal.show();
    }

    edit(item: ViolatedValidationRuleDto): void {
        this.violatedValidationRuleFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}