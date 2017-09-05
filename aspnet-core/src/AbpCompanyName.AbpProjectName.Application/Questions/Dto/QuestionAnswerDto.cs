using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Questions.Dto
{
	[AutoMap(typeof(QuestionAnswer))]
	public class QuestionAnswerDto : EntityDto<Guid>
	{
		
		[Required]
		public string Title { get; set; }
		
		[Required]
		public bool IsActive { get; set; }
		
		[Required]
		public int Order { get; set; }
		
		[StringLength(50)]
		public string Code { get; set; }
		
		[Required]
		public bool AllowText { get; set; }


	}
}