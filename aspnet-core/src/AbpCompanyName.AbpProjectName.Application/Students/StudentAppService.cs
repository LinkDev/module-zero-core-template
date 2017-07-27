using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Students.Dto;

namespace AbpCompanyName.AbpProjectName.Students
{
	public class StudentAppService : AsyncCrudAppService<Student, StudentDto, int, PagedAndSortedResultRequestDto>, IStudentAppService
	{
		public StudentAppService(IRepository<Student, int> repository)
            : base(repository)
        {
		}
	}
}