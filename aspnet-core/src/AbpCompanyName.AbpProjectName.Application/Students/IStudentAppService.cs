using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Students.Dto;

namespace AbpCompanyName.AbpProjectName.Students
{
	public interface IStudentAppService : IFilteredRestoreDeletedAppService<StudentDto, int, FilteredResultRequestDto>
	{
		
	}
}