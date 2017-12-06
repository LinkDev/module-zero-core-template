using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Surveys.Dto
{
	[AutoMap(typeof(Survey))]
	public class SurveyDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "SurveyNameRequired")]
		[StringLength(200,ErrorMessage="SurveyNameMaxLength")]
		public string Name { get; set; }
						
		[Required(ErrorMessage = "SurveyIsActiveRequired")]
		public bool IsActive { get; set; }
						
		public Guid? ParentSurveyId { get; set; }
				public string ParentSurveyName { get; set; }
				
		public int? ParentSurveyRelation { get; set; }
						
		[Required(ErrorMessage = "SurveyIsEnabledRequired")]
		public bool IsEnabled { get; set; }
						
		[StringLength(50,ErrorMessage="SurveyCodeMaxLength")]
		public string Code { get; set; }
						
		[StringLength(200,ErrorMessage="SurveyIconMaxLength")]
		public string Icon { get; set; }
						
		[Required(ErrorMessage = "SurveyAllowAddResponseRequired")]
		public bool AllowAddResponse { get; set; }
						
		[StringLength(50,ErrorMessage="SurveyTypeTextMaxLength")]
		public string TypeText { get; set; }
						
		public int? SerialDigitsCount { get; set; }
						
		public DateTime? LastUpdateTime { get; set; }
						
		public int? MinMinutes { get; set; }
						
		[Required(ErrorMessage = "SurveyProgressCalculationTypeRequired")]
		public int ProgressCalculationType { get; set; }
						
		public int? DailyTarget { get; set; }
						
		public bool? IsTemplate { get; set; }
		

	}
}