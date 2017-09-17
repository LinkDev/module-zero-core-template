using Abp.Authorization.Users;
using Abp.Dependency;
using Abp.MultiTenancy;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Novell.Directory.Ldap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.Authentication.Windows
{
    public class LdapAuthenticationSource : DefaultExternalAuthenticationSource<Tenant, User>, ITransientDependency
    {
        public const string SourceName = "LDAP";
        private readonly IConfigurationRoot _appConfiguration;
        public override string Name
        {
            get { return SourceName; }
        }
        public LdapAuthenticationSource(IHostingEnvironment env)
        {
            _appConfiguration = env.GetAppConfiguration();
        }

        public async override Task<User> CreateUserAsync(string userNameOrEmailAddress, Tenant tenant)
        {
            var user= await base.CreateUserAsync(userNameOrEmailAddress, tenant);
            user.IsEmailConfirmed = true;
            user.IsActive = true;
            user.NormalizedEmailAddress = userNameOrEmailAddress;
            user.NormalizedUserName = userNameOrEmailAddress;

            return user;
        }

        public override Task UpdateUserAsync(User user, Tenant tenant)
        {
            return base.UpdateUserAsync(user, tenant);
        }
        public async override Task<bool> TryAuthenticateAsync(string userNameOrEmailAddress, string plainPassword, Tenant tenant)
        {
            
            using (var cn = new LdapConnection())
            {
                try
                {
                    var host = _appConfiguration["LDAP:host"];
                    var port = _appConfiguration["LDAP:port"];
                    cn.Connect(host, int.Parse(port));

                    cn.Bind(userNameOrEmailAddress, plainPassword);
                    return true;

                }
                catch (Exception ex)
                {

                    return false;
                }

            }
        }        
    }
}
