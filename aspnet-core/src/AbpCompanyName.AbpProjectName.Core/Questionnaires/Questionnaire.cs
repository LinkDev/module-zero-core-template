using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class Questionnaire : Entity<Guid>, IPassivable
	{
				
		[Required]
		[StringLength(255)]
		public string Title { get; set; }
						
		public string Description { get; set; }
						
		public int? Type { get; set; }
						
		public DateTime? CreatedDate { get; set; }
						
		[Required]
		public Guid PhaseId { get; set; }
						
		[Required]
		public bool IsActive { get; set; }
						
		[Required]
		public int QuestionsCount { get; set; }
		
		public virtual Phase Phase { get; set; }
		public virtual Collection<QuestionnaireExamResult> QuestionnaireExamResults { get; set; }
		public virtual Collection<QuestionnaireQuestion> QuestionnaireQuestions { get; set; }

	}
}