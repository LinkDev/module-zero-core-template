using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Students;

namespace AbpCompanyName.AbpProjectName.Students.Dto
{
	[AutoMap(typeof(Student))]
	public class StudentDto : EntityDto
	{
		
		[StringLength(50)]
		public string Name { get; set; }
		
		[Required]
		public string Bio { get; set; }
		
		public int Age { get; set; }
		
		public bool IsActive { get; set; }

	}
}