using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.SimilarityPercentages.Dto
{
	[AutoMap(typeof(SimilarityPercentage))]
	public class SimilarityPercentageDto : EntityDto<Guid>
	{
				
		public Guid? QualityParentResponseId { get; set; }
						
		[Required(ErrorMessage = "SimilarityPercentageQualityResponseCodeRequired")]
		[StringLength(50,ErrorMessage="SimilarityPercentageQualityResponseCodeMaxLength")]
		public string QualityResponseCode { get; set; }
						
		public Guid? RealResponseId { get; set; }
						
		public Guid? RealParentResponseId { get; set; }
						
		[StringLength(50,ErrorMessage="SimilarityPercentageRealResponseCodeMaxLength")]
		public string RealResponseCode { get; set; }
						
		[Required(ErrorMessage = "SimilarityPercentageSurveyIdRequired")]
		public Guid SurveyId { get; set; }
						
		[Required(ErrorMessage = "SimilarityPercentageSimilarResponseAnswersCountRequired")]
		public int SimilarResponseAnswersCount { get; set; }
						
		[Required(ErrorMessage = "SimilarityPercentageAllResponseAnswersCountRequired")]
		public int AllResponseAnswersCount { get; set; }
						
		public int? RelationCode { get; set; }
						
		public int? TypeCode { get; set; }
						
		public int? Age { get; set; }
		

	}
}