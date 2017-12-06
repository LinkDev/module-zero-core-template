import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { EncodingMapperQuestionServiceProxy, EncodingMapperQuestionDto, PagedResultDtoOfEncodingMapperQuestionDto } from '@shared/service-proxies/service-proxies';
import { EncodingMapperQuestionFormComponent } from "app/encoding-mapper-questions/encoding-mapper-question-form/encoding-mapper-question-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'encoding-mapper-question',
    templateUrl: './encoding-mapper-questions.component.html',
    animations: [appModuleAnimation()],
    providers: [
		EncodingMapperQuestionServiceProxy,
	]
})
export class EncodingMapperQuestionsComponent extends FilteredComponentBase<EncodingMapperQuestionDto> {
	items: EncodingMapperQuestionDto[] = [];

    @ViewChild('encodingMapperQuestionFormModal') encodingMapperQuestionFormModal: EncodingMapperQuestionFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			collectorQuestionIdFilter: string;
			encoderQuestionIdFilter: string;
			reviewerQuestionIdFilter: string;
			collectorDetailsQuestionIdFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _encodingMapperQuestionService: EncodingMapperQuestionServiceProxy
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
			this._encodingMapperQuestionService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfEncodingMapperQuestionDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: EncodingMapperQuestionDto): void {
        abp.message.confirm(
            'Delete Encoding mapper question?',
            (result: boolean) => {
                if (result) {
                    this._encodingMapperQuestionService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Encoding mapper question: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.collectorQuestionIdFilter !== undefined && this.collectorQuestionIdFilter !== null && this.collectorQuestionIdFilter.toString() !== '')
        items.push({ FilterName: "CollectorQuestionId", FilterType: FilterType.like, FilterValue: this.collectorQuestionIdFilter });
						        if (this.encoderQuestionIdFilter !== undefined && this.encoderQuestionIdFilter !== null && this.encoderQuestionIdFilter.toString() !== '')
        items.push({ FilterName: "EncoderQuestionId", FilterType: FilterType.like, FilterValue: this.encoderQuestionIdFilter });
						        if (this.reviewerQuestionIdFilter !== undefined && this.reviewerQuestionIdFilter !== null && this.reviewerQuestionIdFilter.toString() !== '')
        items.push({ FilterName: "ReviewerQuestionId", FilterType: FilterType.like, FilterValue: this.reviewerQuestionIdFilter });
						        if (this.collectorDetailsQuestionIdFilter !== undefined && this.collectorDetailsQuestionIdFilter !== null && this.collectorDetailsQuestionIdFilter.toString() !== '')
        items.push({ FilterName: "CollectorDetailsQuestionId", FilterType: FilterType.like, FilterValue: this.collectorDetailsQuestionIdFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.encodingMapperQuestionFormModal.show();
    }

    edit(item: EncodingMapperQuestionDto): void {
        this.encodingMapperQuestionFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}