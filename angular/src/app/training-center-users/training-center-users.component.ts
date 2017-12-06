import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { TrainingCenterUserServiceProxy, TrainingCenterUserDto, PagedResultDtoOfTrainingCenterUserDto } from '@shared/service-proxies/service-proxies';
import { TrainingCenterServiceProxy, TrainingCenterDto, PagedResultDtoOfTrainingCenterDto } from '@shared/service-proxies/service-proxies';
import { TrainingCenterUserFormComponent } from "app/training-center-users/training-center-user-form/training-center-user-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'training-center-user',
    templateUrl: './training-center-users.component.html',
    animations: [appModuleAnimation()],
    providers: [
		TrainingCenterUserServiceProxy,
		TrainingCenterServiceProxy,
	]
})
export class TrainingCenterUsersComponent extends FilteredComponentBase<TrainingCenterUserDto> {
	items: TrainingCenterUserDto[] = [];

    @ViewChild('trainingCenterUserFormModal') trainingCenterUserFormModal: TrainingCenterUserFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			trainingCenterIdFilter: string;
	trainingCenterIdList: TrainingCenterDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _trainingCenterUserService: TrainingCenterUserServiceProxy
			, private _trainingCenterService: TrainingCenterServiceProxy
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
			this._trainingCenterUserService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfTrainingCenterUserDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: TrainingCenterUserDto): void {
        abp.message.confirm(
            'Delete Training center user?',
            (result: boolean) => {
                if (result) {
                    this._trainingCenterUserService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Training center user: ' + item.id);
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
        this.trainingCenterUserFormModal.show();
    }

    edit(item: TrainingCenterUserDto): void {
        this.trainingCenterUserFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}