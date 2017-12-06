using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.DomainSettings.Dto;

namespace AbpCompanyName.AbpProjectName.DomainSettings
{
	public class DomainSettingAppService : AsyncFilteredAppService<DomainSetting, DomainSettingDto, Guid, FilteredResultRequestDto>, IDomainSettingAppService
	{
		public DomainSettingAppService(IRepository<DomainSetting, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Key ASC";
		}

		protected override IQueryable<DomainSetting> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Domain, 
				e => e.Survey
			);
        }
	}
}