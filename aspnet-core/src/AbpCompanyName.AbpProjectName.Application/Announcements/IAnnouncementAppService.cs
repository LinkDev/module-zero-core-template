using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Announcements.Dto;

namespace AbpCompanyName.AbpProjectName.Announcements
{
	public interface IAnnouncementAppService : IFilteredAppService<AnnouncementDto, Guid, FilteredResultRequestDto>
	{
		
	}
}