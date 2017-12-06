using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.PhaseSurveys.Dto
{
	[AutoMap(typeof(PhaseSurvey))]
	public class PhaseSurveyDto : IEntityDto<Guid>
	{
				
		[Required(ErrorMessage = "PhaseSurveyPhaseIdRequired")]
		public Guid PhaseId { get; set; }
				public string PhaseName { get; set; }
				
		[Required(ErrorMessage = "PhaseSurveySurveyIdRequired")]
		public Guid SurveyId { get; set; }
				public string SurveyName { get; set; }

		[NotMapped]
        public Guid Id { get { return SurveyId; } set { SurveyId = value; } }

	}
}