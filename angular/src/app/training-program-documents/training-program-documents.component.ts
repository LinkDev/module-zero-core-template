import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { TrainingProgramDocumentServiceProxy, TrainingProgramDocumentDto, PagedResultDtoOfTrainingProgramDocumentDto } from '@shared/service-proxies/service-proxies';
import { TrainingProgramServiceProxy, TrainingProgramDto, PagedResultDtoOfTrainingProgramDto } from '@shared/service-proxies/service-proxies';
import { TrainingProgramDocumentFormComponent } from "app/training-program-documents/training-program-document-form/training-program-document-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'training-program-document',
    templateUrl: './training-program-documents.component.html',
    animations: [appModuleAnimation()],
    providers: [
		TrainingProgramDocumentServiceProxy,
		TrainingProgramServiceProxy,
	]
})
export class TrainingProgramDocumentsComponent extends FilteredComponentBase<TrainingProgramDocumentDto> {
	items: TrainingProgramDocumentDto[] = [];

    @ViewChild('trainingProgramDocumentFormModal') trainingProgramDocumentFormModal: TrainingProgramDocumentFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			trainingProgramIdFilter: string;
	trainingProgramIdList: TrainingProgramDto[] = null;
			nameFilter: string;
			fileFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _trainingProgramDocumentService: TrainingProgramDocumentServiceProxy
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
			this._trainingProgramDocumentService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfTrainingProgramDocumentDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: TrainingProgramDocumentDto): void {
        abp.message.confirm(
            'Delete Training program document?',
            (result: boolean) => {
                if (result) {
                    this._trainingProgramDocumentService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Training program document: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.trainingProgramIdFilter !== undefined && this.trainingProgramIdFilter !== null && this.trainingProgramIdFilter.toString() !== '')
		items.push({ FilterName: "TrainingProgramId", FilterType: FilterType.in, FilterValue: this.trainingProgramIdFilter });
				        if (this.nameFilter !== undefined && this.nameFilter !== null && this.nameFilter.toString() !== '')
        items.push({ FilterName: "Name", FilterType: FilterType.like, FilterValue: this.nameFilter });
						        if (this.fileFilter !== undefined && this.fileFilter !== null && this.fileFilter.toString() !== '')
        items.push({ FilterName: "File", FilterType: FilterType.like, FilterValue: this.fileFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.trainingProgramDocumentFormModal.show();
    }

    edit(item: TrainingProgramDocumentDto): void {
        this.trainingProgramDocumentFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}