using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Students;

namespace AbpCompanyName.AbpProjectName.Students.Dto
{
	[AutoMapFrom(typeof(Student))]
	public class StudentDto : EntityDto
	{
		
		[StringLength(50)]
		public string Name { get; set; }
		
		[Required]
		[StringLength(1073741823)]
		public string Bio { get; set; }
		
		public int Age { get; set; }
		
		public bool IsActive { get; set; }

	}
}