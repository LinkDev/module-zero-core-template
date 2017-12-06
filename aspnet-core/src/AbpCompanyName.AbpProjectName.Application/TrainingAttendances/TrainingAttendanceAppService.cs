using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.TrainingAttendances.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingAttendances
{
	public class TrainingAttendanceAppService : AsyncFilteredAppService<TrainingAttendance, TrainingAttendanceDto, Guid, FilteredResultRequestDto>, ITrainingAttendanceAppService
	{
		public TrainingAttendanceAppService(IRepository<TrainingAttendance, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Id ASC";
		}

		protected override IQueryable<TrainingAttendance> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.TrainingMember, 
				e => e.TrainingProgram
			);
        }
	}
}