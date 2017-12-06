import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { AnnouncementServiceProxy, AnnouncementDto, PagedResultDtoOfAnnouncementDto } from '@shared/service-proxies/service-proxies';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'announcement-form-modal',
  templateUrl: './announcement-form.component.html'
})
export class AnnouncementFormComponent extends FormComponentBase<AnnouncementDto> implements OnInit, AfterViewInit {
	domainIdList: DomainDto[] = null;
	
    constructor(
        injector: Injector,
			private _announcementService: AnnouncementServiceProxy, 
		private _domainService: DomainServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new AnnouncementDto();
			this.item.id= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._announcementService.get(id)
                .subscribe(
                (result) => {
                    this.item = result;
                    this.active = true;
                    this.modal.show();
                });
            this.isNew = false;
        }
    }

	save(): void {
        console.log(this.item);
        this.saving = true;

        if (this.isNew) {
            this._announcementService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._announcementService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}