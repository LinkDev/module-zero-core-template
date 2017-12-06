import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QuestionTemplateCategoryServiceProxy, QuestionTemplateCategoryDto, PagedResultDtoOfQuestionTemplateCategoryDto } from '@shared/service-proxies/service-proxies';
import { QuestionTemplateCategoryFormComponent } from "app/question-template-categories/question-template-category-form/question-template-category-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'question-template-category',
    templateUrl: './question-template-categories.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionTemplateCategoryServiceProxy,
	]
})
export class QuestionTemplateCategoriesComponent extends FilteredComponentBase<QuestionTemplateCategoryDto> {
	items: QuestionTemplateCategoryDto[] = [];

    @ViewChild('questionTemplateCategoryFormModal') questionTemplateCategoryFormModal: QuestionTemplateCategoryFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			nameEnFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _questionTemplateCategoryService: QuestionTemplateCategoryServiceProxy
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
			this._questionTemplateCategoryService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQuestionTemplateCategoryDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QuestionTemplateCategoryDto): void {
        abp.message.confirm(
            'Delete Question template category?',
            (result: boolean) => {
                if (result) {
                    this._questionTemplateCategoryService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Question template category: ' + item.id);
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
						        if (this.nameEnFilter !== undefined && this.nameEnFilter !== null && this.nameEnFilter.toString() !== '')
        items.push({ FilterName: "NameEn", FilterType: FilterType.like, FilterValue: this.nameEnFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.questionTemplateCategoryFormModal.show();
    }

    edit(item: QuestionTemplateCategoryDto): void {
        this.questionTemplateCategoryFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}