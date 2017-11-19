using Abp.Zero.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore
{
    public partial class AbpProjectNameDbContext 
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
			base.OnModelCreating(modelBuilder);



        }
    }
}