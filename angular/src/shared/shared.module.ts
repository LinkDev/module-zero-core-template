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
import { DropdownComponent } from "shared/components/dropdown.component"
import { TreeModule } from 'angular-tree-component';
import { TreeComponent } from "shared/components/tree.component"
import { ClickOutsideDirective } from 'angular2-click-outside/clickOutside.directive';


@NgModule({
    imports: [
        MdSelectModule,
        MaterialModule, MdDatepickerModule, MdNativeDateModule,
        CommonModule,
        AbpModule,
        RouterModule,
        FormsModule,
        TreeModule
    ],
    declarations: [
        MaterialInput,
        DatePickerInput,
        SelectInput,
        DropdownComponent,
        TreeComponent,
        ClickOutsideDirective
    ],
    exports: [
        MaterialInput,
        DatePickerInput,
        SelectInput,
        DropdownComponent,
        TreeComponent,
    ],
    providers: [{ provide: 'StudentServiceProxy', useClass: Proxies.StudentServiceProxy },
        { provide: 'RoleServiceProxy', useExisting: Proxies.RoleServiceProxy }
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
