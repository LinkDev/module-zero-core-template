using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.PhaseQuestions.Dto
{
	[AutoMap(typeof(PhaseQuestion))]
	public class PhaseQuestionDto : IEntityDto<Guid>
	{
				
		[Required(ErrorMessage = "PhaseQuestionPhaseIdRequired")]
		public Guid PhaseId { get; set; }
				public string PhaseName { get; set; }
				
		[Required(ErrorMessage = "PhaseQuestionQuestionIdRequired")]
		public Guid QuestionId { get; set; }
				public string QuestionTitle { get; set; }

		[NotMapped]
        public Guid Id { get { return QuestionId; } set { QuestionId = value; } }

	}
}