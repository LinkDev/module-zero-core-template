import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { AssetTypeServiceProxy, AssetTypeDto, PagedResultDtoOfAssetTypeDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'asset-type-form-modal',
  templateUrl: './asset-type-form.component.html'
})
export class AssetTypeFormComponent extends FormComponentBase<AssetTypeDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _assetTypeService: AssetTypeServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new AssetTypeDto();
			this.item.id= '00000000-0000-0000-0000-000000000000';
			this.item.isActive= true;
            this.isNew = true;
        }
        else {
            this._assetTypeService.get(id)
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
            this._assetTypeService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._assetTypeService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}