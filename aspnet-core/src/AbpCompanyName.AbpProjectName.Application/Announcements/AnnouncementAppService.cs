using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Announcements.Dto;

namespace AbpCompanyName.AbpProjectName.Announcements
{
	public class AnnouncementAppService : AsyncFilteredAppService<Announcement, AnnouncementDto, Guid, FilteredResultRequestDto>, IAnnouncementAppService
	{
		public AnnouncementAppService(IRepository<Announcement, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Message ASC";
		}

		protected override IQueryable<Announcement> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Domain
			);
        }
	}
}