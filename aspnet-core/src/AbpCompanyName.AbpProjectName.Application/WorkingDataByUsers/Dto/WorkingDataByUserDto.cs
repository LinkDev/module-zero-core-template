using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.WorkingDataByUsers.Dto
{
	[AutoMap(typeof(WorkingDataByUser))]
	public class WorkingDataByUserDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "WorkingDataByUserUserIdRequired")]
		[StringLength(128,ErrorMessage="WorkingDataByUserUserIdMaxLength")]
		public string UserId { get; set; }
						
		[Required(ErrorMessage = "WorkingDataByUserUserNameRequired")]
		[StringLength(100,ErrorMessage="WorkingDataByUserUserNameMaxLength")]
		public string UserName { get; set; }
						
		[Required(ErrorMessage = "WorkingDataByUserUserCodeRequired")]
		[StringLength(50,ErrorMessage="WorkingDataByUserUserCodeMaxLength")]
		public string UserCode { get; set; }
						
		[Required(ErrorMessage = "WorkingDataByUserManagerIdRequired")]
		[StringLength(128,ErrorMessage="WorkingDataByUserManagerIdMaxLength")]
		public string ManagerId { get; set; }
						
		[Required(ErrorMessage = "WorkingDataByUserCompletedSurveysRequired")]
		public int CompletedSurveys { get; set; }
						
		[Required(ErrorMessage = "WorkingDataByUserWorkingHoursRequired")]
		public int WorkingHours { get; set; }
						
		public DateTime? Date { get; set; }
						
		[Required(ErrorMessage = "WorkingDataByUserPhaseIdRequired")]
		public Guid PhaseId { get; set; }
		

	}
}