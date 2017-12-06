import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { UserSurveysTemplateServiceProxy, UserSurveysTemplateDto, PagedResultDtoOfUserSurveysTemplateDto } from '@shared/service-proxies/service-proxies';
import { SurveyServiceProxy, SurveyDto, PagedResultDtoOfSurveyDto } from '@shared/service-proxies/service-proxies';
import { UserSurveysTemplateFormComponent } from "app/user-surveys-templates/user-surveys-template-form/user-surveys-template-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'user-surveys-template',
    templateUrl: './user-surveys-templates.component.html',
    animations: [appModuleAnimation()],
    providers: [
		UserSurveysTemplateServiceProxy,
		SurveyServiceProxy,
	]
})
export class UserSurveysTemplatesComponent extends FilteredComponentBase<UserSurveysTemplateDto> {
	items: UserSurveysTemplateDto[] = [];

    @ViewChild('userSurveysTemplateFormModal') userSurveysTemplateFormModal: UserSurveysTemplateFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			surveyIdFilter: string;
	surveyIdList: SurveyDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _userSurveysTemplateService: UserSurveysTemplateServiceProxy
			, private _surveyService: SurveyServiceProxy
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
			this._userSurveysTemplateService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfUserSurveysTemplateDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: UserSurveysTemplateDto): void {
        abp.message.confirm(
            'Delete User surveys template?',
            (result: boolean) => {
                if (result) {
                    this._userSurveysTemplateService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted User surveys template: ' + item.id);
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
        this.userSurveysTemplateFormModal.show();
    }

    edit(item: UserSurveysTemplateDto): void {
        this.userSurveysTemplateFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}