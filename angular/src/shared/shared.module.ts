import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { MaterialInput } from "shared/directives/material-input.directive";
import { DatePickerInput } from 'shared/input-controls/input-date';
import { PaginationComponent } from 'shared/pagination/pagination.component';
import { SharedMaterialModule} from 'shared/shared-material.module';
import { FileUploadModule } from 'ng2-file-upload';
import 'hammerjs';
import * as Proxies from "shared/service-proxies/service-proxies";
import { DropdownComponent } from "shared/components/dropdown.component"
import { TreeModule } from 'angular-tree-component';
import { TreeComponent } from "shared/components/tree.component"
import { AppConsts } from '@shared/AppConsts';
import { SelectInput } from "shared/input-controls/input-select";
import { UploadInput } from "shared/components/upload-input";
import { UploadImageInput } from "shared/components/upload-image";
import { RichEditorInput } from "shared/input-controls/input-richEditor";
import { InputComponent } from "shared/input-controls/input-text";
import { ValidateComponent } from "shared/components/validation.component";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
export function getRemoteServiceBaseUrl(): string {
    return AppConsts.remoteServiceBaseUrl;
  }
@NgModule({
    imports: [
        SharedMaterialModule,
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
        CommonModule,
        AbpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        TreeModule,
        FileUploadModule
    ],
    declarations: [
        MaterialInput,
        DatePickerInput,
        SelectInput,
        DropdownComponent,
        TreeComponent,
        RichEditorInput,
        UploadInput,
        UploadImageInput,
        InputComponent,
        ValidateComponent

    ],
    exports: [
        MaterialInput,
        DatePickerInput,
        SelectInput,
        DropdownComponent,
        TreeComponent,
        RichEditorInput,
        UploadInput,
        UploadImageInput,
        InputComponent,
        ValidateComponent
    ],
    providers:[	{provide: 'SampleServiceProxy', useClass: Proxies.SampleServiceProxy},
	
    Proxies.ValidationServiceProxy,    
    {provide: 'RoleServiceProxy', useExisting: Proxies.RoleServiceProxy}
]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AppSessionService,
                AppUrlService,
                AppAuthService,
                AppRouteGuard
            ]
        }
    }
}
