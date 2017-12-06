using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionnaireQuestionAttachments.Dto
{
	[AutoMap(typeof(QuestionnaireQuestionAttachment))]
	public class QuestionnaireQuestionAttachmentDto : EntityDto<Guid>
	{
				
		[StringLength(255,ErrorMessage="QuestionnaireQuestionAttachmentNameMaxLength")]
		public string Name { get; set; }
						
		public string Description { get; set; }
						
		[Required(ErrorMessage = "QuestionnaireQuestionAttachmentPathRequired")]
		[StringLength(500,ErrorMessage="QuestionnaireQuestionAttachmentPathMaxLength")]
		public string Path { get; set; }
						
		[Required(ErrorMessage = "QuestionnaireQuestionAttachmentOrderRequired")]
		public int Order { get; set; }
						
		[Required(ErrorMessage = "QuestionnaireQuestionAttachmentQuestionIdRequired")]
		public Guid QuestionId { get; set; }
				public string QuestionTitle { get; set; }
				
		[Required(ErrorMessage = "QuestionnaireQuestionAttachmentTypeRequired")]
		public int Type { get; set; }
		

	}
}