using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Questionnaires.Dto
{
	[AutoMap(typeof(Questionnaire))]
	public class QuestionnaireDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "QuestionnaireTitleRequired")]
		[StringLength(255,ErrorMessage="QuestionnaireTitleMaxLength")]
		public string Title { get; set; }
						
		public string Description { get; set; }
						
		public int? Type { get; set; }
						
		public DateTime? CreatedDate { get; set; }
						
		[Required(ErrorMessage = "QuestionnairePhaseIdRequired")]
		public Guid PhaseId { get; set; }
				public string PhaseName { get; set; }
				
		[Required(ErrorMessage = "QuestionnaireIsActiveRequired")]
		public bool IsActive { get; set; }
						
		[Required(ErrorMessage = "QuestionnaireQuestionsCountRequired")]
		public int QuestionsCount { get; set; }
		

	}
}