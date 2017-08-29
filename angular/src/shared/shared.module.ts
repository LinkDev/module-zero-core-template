import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { MaterialInput } from "shared/directives/material-input.directive";
import { DatePickerInput } from 'shared/components/date-picker-input';
import { SelectInput } from 'shared/components/select-input';
import { PaginationComponent } from 'shared/pagination/pagination.component';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import 'hammerjs';
import * as Proxies from "shared/service-proxies/service-proxies";
@NgModule({
    imports: [
        MdSelectModule,
        MaterialModule, MdDatepickerModule, MdNativeDateModule,
        CommonModule,
        AbpModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        MaterialInput,
        DatePickerInput,
        SelectInput
    ],
    exports: [
        MaterialInput,
        DatePickerInput,
        SelectInput
    ],
    providers:[{provide: 'RoleServiceProxy', useExisting: Proxies.RoleServiceProxy},{provide: 'QuestionGroupServiceProxy', useClass: Proxies.QuestionGroupServiceProxy}]
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
