using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Timing;


using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.Localization;
using AbpCompanyName.AbpProjectName.Timing;
using System.Collections.Generic;

namespace AbpCompanyName.AbpProjectName
{
    //[DependsOn(typeof(AbpZeroCoreModule))]
    public class AbpProjectNameCoreModule : AbpModule
    {
        private static List<Abp.Localization.LanguageInfo> GetInitialLanguages()
        {
            return new List<Abp.Localization.LanguageInfo>
            {
                new Abp.Localization.LanguageInfo("en", "English", "famfamfam-flags gb"),
                new Abp.Localization.LanguageInfo("ar", "العربية", "famfamfam-flags sa"),
                new Abp.Localization.LanguageInfo("de", "German", "famfamfam-flags de"),
                new Abp.Localization.LanguageInfo("it", "Italiano", "famfamfam-flags it"),
                new Abp.Localization.LanguageInfo("fr", "Français", "famfamfam-flags fr"),
                new Abp.Localization.LanguageInfo("pt-BR", "Portuguese", "famfamfam-flags br"),
                new Abp.Localization.LanguageInfo("tr", "Türkçe", "famfamfam-flags tr"),
                new Abp.Localization.LanguageInfo("ru", "Русский", "famfamfam-flags ru"),
                new Abp.Localization.LanguageInfo("zh-CN", "简体中文", "famfamfam-flags cn"),
                new Abp.Localization.LanguageInfo("es-MX", "Español México", "famfamfam-flags mx"),
                new Abp.Localization.LanguageInfo("ja", "日本語", "famfamfam-flags jp")
            };
        }
        public override void PreInitialize()
        {
            Configuration.Auditing.IsEnabledForAnonymousUsers = true;

            // Declare entity types

            foreach (var item in GetInitialLanguages())
            {
                Configuration.Localization.Languages.Add(item);
            }

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
