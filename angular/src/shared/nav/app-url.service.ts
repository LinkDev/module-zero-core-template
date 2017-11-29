import { Injectable } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppSessionService } from '../session/app-session.service';

@Injectable()
export class AppUrlService {

    static tenancyNamePlaceHolder: string = '{TENANCY_NAME}';

    constructor(
        private readonly _appSessionService: AppSessionService
    ) {

    }

    private ensureEndsWith(str: string, c: string) {
        if (str.charAt(str.length - 1) !== c) {
            str = str + c;
        }

        return str;
    }

    private removeFromEnd(str: string, c: string) {
        if (str.charAt(str.length - 1) === c) {
            str = str.substr(0, str.length - 1);
        }

        return str;
    }
}