using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Questions.Dto
{
	[AutoMap(typeof(Question))]
	public class QuestionDto : EntityDto<Guid>
	{
		
		[Required]
		public string Title { get; set; }
		
		[Required]
		public bool IsActive { get; set; }
		
		[Required]
		public int Order { get; set; }
		
		[Required]
		public int QuestionType { get; set; }
		
		public Guid? DomainGroupId { get; set; }
		public string DomainGroupName { get; set; }
		
		public int? DomainGroupLevelsNumber { get; set; }
		
		[Required]
		public Guid QuestionGroupId { get; set; }
		public string QuestionGroupName { get; set; }
		
		[StringLength(50)]
		public string Code { get; set; }
		
		public bool? IsRequired { get; set; }
		
		public bool? IsHidden { get; set; }
		
		[StringLength(500)]
		public string Description { get; set; }
		
		[StringLength(50)]
		public string QuestionNumber { get; set; }
		
		public string Help { get; set; }
		
		public string DefaultAnswerValue { get; set; }
		
		public bool? IsUsedInCallBack { get; set; }


		public virtual Collection<QuestionAnswerDto> QuestionAnswers { get; set; }
	}
}