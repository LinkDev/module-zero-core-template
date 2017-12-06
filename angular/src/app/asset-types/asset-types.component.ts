import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { AssetTypeServiceProxy, AssetTypeDto, PagedResultDtoOfAssetTypeDto } from '@shared/service-proxies/service-proxies';
import { AssetTypeFormComponent } from "app/asset-types/asset-type-form/asset-type-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'asset-type',
    templateUrl: './asset-types.component.html',
    animations: [appModuleAnimation()],
    providers: [
		AssetTypeServiceProxy,
	]
})
export class AssetTypesComponent extends FilteredComponentBase<AssetTypeDto> {
	items: AssetTypeDto[] = [];

    @ViewChild('assetTypeFormModal') assetTypeFormModal: AssetTypeFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			isActiveFilter: boolean;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _assetTypeService: AssetTypeServiceProxy
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
			this._assetTypeService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfAssetTypeDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: AssetTypeDto): void {
        abp.message.confirm(
            'Delete Asset type?',
            (result: boolean) => {
                if (result) {
                    this._assetTypeService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Asset type: ' + item.id);
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
						        if (this.isActiveFilter !== undefined && this.isActiveFilter !== null && this.isActiveFilter.toString() !== '')
		items.push({ FilterName: "IsActive", FilterType: FilterType.eq, FilterValue: this.isActiveFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.assetTypeFormModal.show();
    }

    edit(item: AssetTypeDto): void {
        this.assetTypeFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}