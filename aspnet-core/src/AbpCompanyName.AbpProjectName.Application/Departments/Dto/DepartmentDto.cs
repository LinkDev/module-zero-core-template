using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Departments.Dto
{
	[AutoMap(typeof(Department))]
	public class DepartmentDto : EntityDto
	{
		
		[Required]
		[StringLength(50)]
		public string Name { get; set; }
		
		[Required]
		public int StudentId { get; set; }


	}
}