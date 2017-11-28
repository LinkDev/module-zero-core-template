using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Timing;


using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.Localization;
using AbpCompanyName.AbpProjectName.Timing;

namespace AbpCompanyName.AbpProjectName
{
    //[DependsOn(typeof(AbpZeroCoreModule))]
    public class AbpProjectNameCoreModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Auditing.IsEnabledForAnonymousUsers = true;

            // Declare entity types
           

            AbpProjectNameLocalizationConfigurer.Configure(Configuration.Localization);

            // Enable this line to create a multi-tenant application.
            Configuration.MultiTenancy.IsEnabled = AbpProjectNameConsts.MultiTenancyEnabled;



            Configuration.Settings.Providers.Add<AppSettingProvider>();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AbpProjectNameCoreModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            IocManager.Resolve<AppTimes>().StartupTime = Clock.Now;
        }
    }
}
