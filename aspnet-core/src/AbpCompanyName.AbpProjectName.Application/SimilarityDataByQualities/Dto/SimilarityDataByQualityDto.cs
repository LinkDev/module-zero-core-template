using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.SimilarityDataByQualities.Dto
{
	[AutoMap(typeof(SimilarityDataByQuality))]
	public class SimilarityDataByQualityDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "SimilarityDataByQualityDomainIdRequired")]
		public Guid DomainId { get; set; }
						
		public Guid? ParentDomainId { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByQualityDomainNameRequired")]
		[StringLength(128,ErrorMessage="SimilarityDataByQualityDomainNameMaxLength")]
		public string DomainName { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByQualityDomainCodeRequired")]
		[StringLength(50,ErrorMessage="SimilarityDataByQualityDomainCodeMaxLength")]
		public string DomainCode { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByQualityPhaseIdRequired")]
		public Guid PhaseId { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByQualitySurveyIdRequired")]
		public Guid SurveyId { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByQualityQuestionIdRequired")]
		public Guid QuestionId { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByQualitySimilarResponseAnswersCountRequired")]
		public int SimilarResponseAnswersCount { get; set; }
						
		[Required(ErrorMessage = "SimilarityDataByQualityAllResponseAnswersCountRequired")]
		public int AllResponseAnswersCount { get; set; }
		

	}
}