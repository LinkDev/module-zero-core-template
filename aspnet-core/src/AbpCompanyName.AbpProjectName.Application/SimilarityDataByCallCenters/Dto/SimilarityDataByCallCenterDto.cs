using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.SimilarityDataByCallCenters.Dto
{
	[AutoMap(typeof(SimilarityDataByCallCenter))]
	public class SimilarityDataByCallCenterDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "SimilarityDataByCallCenterDomainIdRequired")]
		public Guid DomainId { get; set; }
						
		public Guid? ParentDomainId { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByCallCenterDomainNameRequired")]
		[StringLength(128,ErrorMessage="SimilarityDataByCallCenterDomainNameMaxLength")]
		public string DomainName { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByCallCenterDomainCodeRequired")]
		[StringLength(50,ErrorMessage="SimilarityDataByCallCenterDomainCodeMaxLength")]
		public string DomainCode { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByCallCenterPhaseIdRequired")]
		public Guid PhaseId { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByCallCenterSurveyIdRequired")]
		public Guid SurveyId { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByCallCenterQuestionIdRequired")]
		public Guid QuestionId { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByCallCenterSimilarResponseAnswersCountRequired")]
		public int SimilarResponseAnswersCount { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByCallCenterAllResponseAnswersCountRequired")]
		public int AllResponseAnswersCount { get; set; }
		

	}
}