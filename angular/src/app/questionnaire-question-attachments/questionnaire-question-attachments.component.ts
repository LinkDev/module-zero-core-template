import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QuestionnaireQuestionAttachmentServiceProxy, QuestionnaireQuestionAttachmentDto, PagedResultDtoOfQuestionnaireQuestionAttachmentDto } from '@shared/service-proxies/service-proxies';
import { QuestionnaireQuestionServiceProxy, QuestionnaireQuestionDto, PagedResultDtoOfQuestionnaireQuestionDto } from '@shared/service-proxies/service-proxies';
import { QuestionnaireQuestionAttachmentFormComponent } from "app/questionnaire-question-attachments/questionnaire-question-attachment-form/questionnaire-question-attachment-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'questionnaire-question-attachment',
    templateUrl: './questionnaire-question-attachments.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionnaireQuestionAttachmentServiceProxy,
		QuestionnaireQuestionServiceProxy,
	]
})
export class QuestionnaireQuestionAttachmentsComponent extends FilteredComponentBase<QuestionnaireQuestionAttachmentDto> {
	items: QuestionnaireQuestionAttachmentDto[] = [];

    @ViewChild('questionnaireQuestionAttachmentFormModal') questionnaireQuestionAttachmentFormModal: QuestionnaireQuestionAttachmentFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			descriptionFilter: string;
			pathFilter: string;
			orderFilter: number;
			questionIdFilter: string;
	questionIdList: QuestionnaireQuestionDto[] = null;
			typeFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _questionnaireQuestionAttachmentService: QuestionnaireQuestionAttachmentServiceProxy
			, private _questionnaireQuestionService: QuestionnaireQuestionServiceProxy
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
			this._questionnaireQuestionAttachmentService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQuestionnaireQuestionAttachmentDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QuestionnaireQuestionAttachmentDto): void {
        abp.message.confirm(
            'Delete Questionnaire question attachment?',
            (result: boolean) => {
                if (result) {
                    this._questionnaireQuestionAttachmentService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Questionnaire question attachment: ' + item.id);
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
        this.questionnaireQuestionAttachmentFormModal.show();
    }

    edit(item: QuestionnaireQuestionAttachmentDto): void {
        this.questionnaireQuestionAttachmentFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}