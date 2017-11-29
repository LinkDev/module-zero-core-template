import { Injectable } from '@angular/core';
import { SessionServiceProxy,ApplicationInfoDto, GetCurrentLoginInformationsOutput } from '@shared/service-proxies/service-proxies'
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service'

@Injectable()
export class AppSessionService {

    private _application: ApplicationInfoDto;

    constructor(
        private _sessionService: SessionServiceProxy,
        private _abpMultiTenancyService: AbpMultiTenancyService) {
    }

    get application(): ApplicationInfoDto {
        return this._application;
    }


    init(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this._sessionService.getCurrentLoginInformations().toPromise().then((result: GetCurrentLoginInformationsOutput) => {
                this._application = result.application;
                resolve(true);
            }, (err) => {
                reject(err);
            });
        });
    }

}