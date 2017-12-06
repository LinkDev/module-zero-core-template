using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class SimilarityDataByCallCenter : Entity<Guid>
	{
				
		[Required]
		public Guid DomainId { get; set; }
						
		public Guid? ParentDomainId { get; set; }
						
		[Required]
		[StringLength(128)]
		public string DomainName { get; set; }
						
		[Required]
		[StringLength(50)]
		public string DomainCode { get; set; }
						
		[Required]
		public Guid PhaseId { get; set; }
						
		[Required]
		public Guid SurveyId { get; set; }
						
		[Required]
		public Guid QuestionId { get; set; }
						
		[Required]
		public int SimilarResponseAnswersCount { get; set; }
						
		[Required]
		public int AllResponseAnswersCount { get; set; }
		

	}
}