import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { TrainingExamServiceProxy, TrainingExamDto, PagedResultDtoOfTrainingExamDto } from '@shared/service-proxies/service-proxies';
import { TrainingProgramServiceProxy, TrainingProgramDto, PagedResultDtoOfTrainingProgramDto } from '@shared/service-proxies/service-proxies';
import { TrainingExamFormComponent } from "app/training-exams/training-exam-form/training-exam-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'training-exam',
    templateUrl: './training-exams.component.html',
    animations: [appModuleAnimation()],
    providers: [
		TrainingExamServiceProxy,
		TrainingProgramServiceProxy,
	]
})
export class TrainingExamsComponent extends FilteredComponentBase<TrainingExamDto> {
	items: TrainingExamDto[] = [];

    @ViewChild('trainingExamFormModal') trainingExamFormModal: TrainingExamFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			trainingProgramIdFilter: string;
	trainingProgramIdList: TrainingProgramDto[] = null;
			isActiveFilter: boolean;
			orderFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _trainingExamService: TrainingExamServiceProxy
			, private _trainingProgramService: TrainingProgramServiceProxy
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
			this._trainingExamService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfTrainingExamDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: TrainingExamDto): void {
        abp.message.confirm(
            'Delete Training exam?',
            (result: boolean) => {
                if (result) {
                    this._trainingExamService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Training exam: ' + item.id);
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
						        if (this.trainingProgramIdFilter !== undefined && this.trainingProgramIdFilter !== null && this.trainingProgramIdFilter.toString() !== '')
		items.push({ FilterName: "TrainingProgramId", FilterType: FilterType.in, FilterValue: this.trainingProgramIdFilter });
				        if (this.isActiveFilter !== undefined && this.isActiveFilter !== null && this.isActiveFilter.toString() !== '')
		items.push({ FilterName: "IsActive", FilterType: FilterType.eq, FilterValue: this.isActiveFilter });
				        if (this.orderFilter !== undefined && this.orderFilter !== null && this.orderFilter.toString() !== '')
		items.push({ FilterName: "Order", FilterType: FilterType.eq, FilterValue: this.orderFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.trainingExamFormModal.show();
    }

    edit(item: TrainingExamDto): void {
        this.trainingExamFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}