using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class SimilarityPercentage : Entity<Guid>
	{
				
		public Guid? QualityParentResponseId { get; set; }
						
		[Required]
		[StringLength(50)]
		public string QualityResponseCode { get; set; }
						
		public Guid? RealResponseId { get; set; }
						
		public Guid? RealParentResponseId { get; set; }
						
		[StringLength(50)]
		public string RealResponseCode { get; set; }
						
		[Required]
		public Guid SurveyId { get; set; }
						
		[Required]
		public int SimilarResponseAnswersCount { get; set; }
						
		[Required]
		public int AllResponseAnswersCount { get; set; }
						
		public int? RelationCode { get; set; }
						
		public int? TypeCode { get; set; }
						
		public int? Age { get; set; }
		

	}
}