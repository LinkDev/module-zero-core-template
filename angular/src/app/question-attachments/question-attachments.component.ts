import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QuestionAttachmentServiceProxy, QuestionAttachmentDto, PagedResultDtoOfQuestionAttachmentDto } from '@shared/service-proxies/service-proxies';
import { QuestionServiceProxy, QuestionDto, PagedResultDtoOfQuestionDto } from '@shared/service-proxies/service-proxies';
import { QuestionAttachmentFormComponent } from "app/question-attachments/question-attachment-form/question-attachment-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'question-attachment',
    templateUrl: './question-attachments.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionAttachmentServiceProxy,
		QuestionServiceProxy,
	]
})
export class QuestionAttachmentsComponent extends FilteredComponentBase<QuestionAttachmentDto> {
	items: QuestionAttachmentDto[] = [];

    @ViewChild('questionAttachmentFormModal') questionAttachmentFormModal: QuestionAttachmentFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			descriptionFilter: string;
			pathFilter: string;
			orderFilter: number;
			questionIdFilter: string;
	questionIdList: QuestionDto[] = null;
			typeFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _questionAttachmentService: QuestionAttachmentServiceProxy
			, private _questionService: QuestionServiceProxy
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
			this._questionAttachmentService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQuestionAttachmentDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QuestionAttachmentDto): void {
        abp.message.confirm(
            'Delete Question attachment?',
            (result: boolean) => {
                if (result) {
                    this._questionAttachmentService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Question attachment: ' + item.id);
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
						        if (this.descriptionFilter !== undefined && this.descriptionFilter !== null && this.descriptionFilter.toString() !== '')
        items.push({ FilterName: "Description", FilterType: FilterType.like, FilterValue: this.descriptionFilter });
						        if (this.pathFilter !== undefined && this.pathFilter !== null && this.pathFilter.toString() !== '')
        items.push({ FilterName: "Path", FilterType: FilterType.like, FilterValue: this.pathFilter });
						        if (this.orderFilter !== undefined && this.orderFilter !== null && this.orderFilter.toString() !== '')
		items.push({ FilterName: "Order", FilterType: FilterType.eq, FilterValue: this.orderFilter });
				        if (this.questionIdFilter !== undefined && this.questionIdFilter !== null && this.questionIdFilter.toString() !== '')
		items.push({ FilterName: "QuestionId", FilterType: FilterType.in, FilterValue: this.questionIdFilter });
				        if (this.typeFilter !== undefined && this.typeFilter !== null && this.typeFilter.toString() !== '')
		items.push({ FilterName: "Type", FilterType: FilterType.eq, FilterValue: this.typeFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.questionAttachmentFormModal.show();
    }

    edit(item: QuestionAttachmentDto): void {
        this.questionAttachmentFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}