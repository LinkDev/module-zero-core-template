import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { UserProfilesProgressServiceProxy, UserProfilesProgressDto, PagedResultDtoOfUserProfilesProgressDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'user-profiles-progress-form-modal',
  templateUrl: './user-profiles-progress-form.component.html'
})
export class UserProfilesProgressFormComponent extends FormComponentBase<UserProfilesProgressDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _userProfilesProgressService: UserProfilesProgressServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new UserProfilesProgressDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.isActive= true;
			this.item.surveyId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._userProfilesProgressService.get(id)
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
            this._userProfilesProgressService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._userProfilesProgressService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}