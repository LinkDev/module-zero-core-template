using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Auditing;
using AbpCompanyName.AbpProjectName.Sessions.Dto;
using AbpCompanyName.AbpProjectName.SignalR;

namespace AbpCompanyName.AbpProjectName.Sessions
{
    public class SessionAppService : AbpProjectNameAppServiceBase, ISessionAppService
    {
        [DisableAuditing]
        public GetCurrentLoginInformationsOutput GetCurrentLoginInformations()
        {
            var output = new GetCurrentLoginInformationsOutput
            {
                Application = new ApplicationInfoDto
                {
                    Version = AppVersionHelper.Version,
                    ReleaseDate = AppVersionHelper.ReleaseDate,
                    Features = new Dictionary<string, bool>
                    {
                        { "SignalR", SignalRFeature.IsAvailable }
                    }
                }
            };
            return output;
        }
    }
}
