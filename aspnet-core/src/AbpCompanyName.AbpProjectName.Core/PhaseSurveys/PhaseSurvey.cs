using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
	public class PhaseSurvey : IEntity<Guid>
	{
				
		[Required]
		public Guid PhaseId { get; set; }
						
		[Required]
		public Guid SurveyId { get; set; }
		
		public virtual Phase Phase { get; set; }
		public virtual Survey Survey { get; set; }

		[NotMapped]
        public Guid Id { get { return SurveyId; } set { SurveyId = value; } }

        public bool IsTransient()
        {
            if (Id == new Guid())
                return true;
            else
                return false;
        }
	}
}