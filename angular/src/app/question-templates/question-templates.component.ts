import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QuestionTemplateServiceProxy, QuestionTemplateDto, PagedResultDtoOfQuestionTemplateDto } from '@shared/service-proxies/service-proxies';
import { QuestionTemplateSubCategoryServiceProxy, QuestionTemplateSubCategoryDto, PagedResultDtoOfQuestionTemplateSubCategoryDto } from '@shared/service-proxies/service-proxies';
import { QuestionTemplateFormComponent } from "app/question-templates/question-template-form/question-template-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'question-template',
    templateUrl: './question-templates.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionTemplateServiceProxy,
		QuestionTemplateSubCategoryServiceProxy,
	]
})
export class QuestionTemplatesComponent extends FilteredComponentBase<QuestionTemplateDto> {
	items: QuestionTemplateDto[] = [];

    @ViewChild('questionTemplateFormModal') questionTemplateFormModal: QuestionTemplateFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			questionTemplateSubCategoryIdFilter: string;
	questionTemplateSubCategoryIdList: QuestionTemplateSubCategoryDto[] = null;
			nameFilter: string;
			nameEnFilter: string;
			typeFilter: number;
			codeFilter: string;
			isRequiredFilter: boolean;
			descriptionFilter: string;
			descriptionEnFilter: string;
			helpFilter: string;
			helpEnFilter: string;
			domainGroupIdFilter: string;
			domainGroupLevelsNumberFilter: number;
			orderFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _questionTemplateService: QuestionTemplateServiceProxy
			, private _questionTemplateSubCategoryService: QuestionTemplateSubCategoryServiceProxy
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
			this._questionTemplateService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQuestionTemplateDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QuestionTemplateDto): void {
        abp.message.confirm(
            'Delete Question template?',
            (result: boolean) => {
                if (result) {
                    this._questionTemplateService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Question template: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.questionTemplateSubCategoryIdFilter !== undefined && this.questionTemplateSubCategoryIdFilter !== null && this.questionTemplateSubCategoryIdFilter.toString() !== '')
		items.push({ FilterName: "QuestionTemplateSubCategoryId", FilterType: FilterType.in, FilterValue: this.questionTemplateSubCategoryIdFilter });
				        if (this.nameFilter !== undefined && this.nameFilter !== null && this.nameFilter.toString() !== '')
        items.push({ FilterName: "Name", FilterType: FilterType.like, FilterValue: this.nameFilter });
						        if (this.nameEnFilter !== undefined && this.nameEnFilter !== null && this.nameEnFilter.toString() !== '')
        items.push({ FilterName: "NameEn", FilterType: FilterType.like, FilterValue: this.nameEnFilter });
						        if (this.typeFilter !== undefined && this.typeFilter !== null && this.typeFilter.toString() !== '')
		items.push({ FilterName: "Type", FilterType: FilterType.eq, FilterValue: this.typeFilter });
				        if (this.codeFilter !== undefined && this.codeFilter !== null && this.codeFilter.toString() !== '')
        items.push({ FilterName: "Code", FilterType: FilterType.like, FilterValue: this.codeFilter });
						        if (this.isRequiredFilter !== undefined && this.isRequiredFilter !== null && this.isRequiredFilter.toString() !== '')
		items.push({ FilterName: "IsRequired", FilterType: FilterType.eq, FilterValue: this.isRequiredFilter });
				        if (this.descriptionFilter !== undefined && this.descriptionFilter !== null && this.descriptionFilter.toString() !== '')
        items.push({ FilterName: "Description", FilterType: FilterType.like, FilterValue: this.descriptionFilter });
						        if (this.descriptionEnFilter !== undefined && this.descriptionEnFilter !== null && this.descriptionEnFilter.toString() !== '')
        items.push({ FilterName: "DescriptionEn", FilterType: FilterType.like, FilterValue: this.descriptionEnFilter });
						        if (this.helpFilter !== undefined && this.helpFilter !== null && this.helpFilter.toString() !== '')
        items.push({ FilterName: "Help", FilterType: FilterType.like, FilterValue: this.helpFilter });
						        if (this.helpEnFilter !== undefined && this.helpEnFilter !== null && this.helpEnFilter.toString() !== '')
        items.push({ FilterName: "HelpEn", FilterType: FilterType.like, FilterValue: this.helpEnFilter });
						        if (this.domainGroupIdFilter !== undefined && this.domainGroupIdFilter !== null && this.domainGroupIdFilter.toString() !== '')
        items.push({ FilterName: "DomainGroupId", FilterType: FilterType.like, FilterValue: this.domainGroupIdFilter });
						        if (this.domainGroupLevelsNumberFilter !== undefined && this.domainGroupLevelsNumberFilter !== null && this.domainGroupLevelsNumberFilter.toString() !== '')
		items.push({ FilterName: "DomainGroupLevelsNumber", FilterType: FilterType.eq, FilterValue: this.domainGroupLevelsNumberFilter });
				        if (this.orderFilter !== undefined && this.orderFilter !== null && this.orderFilter.toString() !== '')
		items.push({ FilterName: "Order", FilterType: FilterType.eq, FilterValue: this.orderFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.questionTemplateFormModal.show();
    }

    edit(item: QuestionTemplateDto): void {
        this.questionTemplateFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}