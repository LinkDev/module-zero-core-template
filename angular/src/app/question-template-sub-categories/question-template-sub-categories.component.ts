import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QuestionTemplateSubCategoryServiceProxy, QuestionTemplateSubCategoryDto, PagedResultDtoOfQuestionTemplateSubCategoryDto } from '@shared/service-proxies/service-proxies';
import { QuestionTemplateCategoryServiceProxy, QuestionTemplateCategoryDto, PagedResultDtoOfQuestionTemplateCategoryDto } from '@shared/service-proxies/service-proxies';
import { QuestionTemplateSubCategoryFormComponent } from "app/question-template-sub-categories/question-template-sub-category-form/question-template-sub-category-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'question-template-sub-category',
    templateUrl: './question-template-sub-categories.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionTemplateSubCategoryServiceProxy,
		QuestionTemplateCategoryServiceProxy,
	]
})
export class QuestionTemplateSubCategoriesComponent extends FilteredComponentBase<QuestionTemplateSubCategoryDto> {
	items: QuestionTemplateSubCategoryDto[] = [];

    @ViewChild('questionTemplateSubCategoryFormModal') questionTemplateSubCategoryFormModal: QuestionTemplateSubCategoryFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			questionTemplateCategoryIdFilter: string;
	questionTemplateCategoryIdList: QuestionTemplateCategoryDto[] = null;
			nameFilter: string;
			nameEnFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _questionTemplateSubCategoryService: QuestionTemplateSubCategoryServiceProxy
			, private _questionTemplateCategoryService: QuestionTemplateCategoryServiceProxy
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
			this._questionTemplateSubCategoryService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQuestionTemplateSubCategoryDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QuestionTemplateSubCategoryDto): void {
        abp.message.confirm(
            'Delete Question template sub category?',
            (result: boolean) => {
                if (result) {
                    this._questionTemplateSubCategoryService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Question template sub category: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.questionTemplateCategoryIdFilter !== undefined && this.questionTemplateCategoryIdFilter !== null && this.questionTemplateCategoryIdFilter.toString() !== '')
		items.push({ FilterName: "QuestionTemplateCategoryId", FilterType: FilterType.in, FilterValue: this.questionTemplateCategoryIdFilter });
				        if (this.nameFilter !== undefined && this.nameFilter !== null && this.nameFilter.toString() !== '')
        items.push({ FilterName: "Name", FilterType: FilterType.like, FilterValue: this.nameFilter });
						        if (this.nameEnFilter !== undefined && this.nameEnFilter !== null && this.nameEnFilter.toString() !== '')
        items.push({ FilterName: "NameEn", FilterType: FilterType.like, FilterValue: this.nameEnFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.questionTemplateSubCategoryFormModal.show();
    }

    edit(item: QuestionTemplateSubCategoryDto): void {
        this.questionTemplateSubCategoryFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}