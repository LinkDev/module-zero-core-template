using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using AbpCompanyName.AbpProjectName.Configuration.Dto;

namespace AbpCompanyName.AbpProjectName.Configuration
{
    
    public class ConfigurationAppService : AbpProjectNameAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForApplicationAsync(AppSettingNames.UiTheme, input.Theme);
        }
    }
}
