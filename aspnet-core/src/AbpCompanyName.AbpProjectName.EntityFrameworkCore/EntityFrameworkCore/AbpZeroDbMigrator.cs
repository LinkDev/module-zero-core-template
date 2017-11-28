using Abp.Domain.Uow;
//using Abp.EntityFrameworkCore;
using Abp.MultiTenancy;


namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore
{
    public class AbpZeroDbMigrator : AbpDbMigrator<AbpProjectNameDbContext>
    {
        public AbpZeroDbMigrator(
            IUnitOfWorkManager unitOfWorkManager,
            IDbPerTenantConnectionStringResolver connectionStringResolver,
            IDbContextResolver dbContextResolver)
            : base(
                unitOfWorkManager,
                connectionStringResolver,
                dbContextResolver)
        {
        }
    }
}
