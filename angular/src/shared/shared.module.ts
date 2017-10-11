import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { MaterialInput } from "shared/directives/material-input.directive";
import { DatePickerInput } from 'shared/components/date-picker-input';
import { PaginationComponent } from 'shared/pagination/pagination.component';
import { SharedMaterialModule } from 'shared/shared-material.module';
import { FileUploadModule } from 'ng2-file-upload';
import 'hammerjs';
import * as Proxies from "shared/service-proxies/service-proxies";
import { DropdownComponent } from "shared/components/dropdown.component"
import { TreeModule } from 'angular-tree-component';
import { TreeComponent } from "shared/components/tree.component"

import { SelectInput } from "shared/components/select-input";
import { UploadInput } from "shared/components/upload-input";
import { ClickOutsideDirective } from 'angular2-click-outside/clickOutside.directive';
import { UploadImageInput } from "shared/components/upload-image";

@NgModule({
    imports: [
        FileUploadModule,
        SharedMaterialModule,
        CommonModule,
        AbpModule,
        RouterModule,
        FormsModule,
        TreeModule,
        ReactiveFormsModule
    ],
    declarations: [
        MaterialInput,
        DatePickerInput,
        SelectInput,
        DropdownComponent,
        TreeComponent,
        ClickOutsideDirective,
        UploadInput,
        UploadImageInput
    ],
    exports: [
        MaterialInput,
        DatePickerInput,
        SelectInput,
        DropdownComponent,
        TreeComponent,
        UploadInput,
        ClickOutsideDirective,
        UploadImageInput
    ],
    providers:[{provide: 'RoleServiceProxy', useExisting: Proxies.RoleServiceProxy},{provide: 'StudentServiceProxy', useClass: Proxies.StudentServiceProxy}]
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
