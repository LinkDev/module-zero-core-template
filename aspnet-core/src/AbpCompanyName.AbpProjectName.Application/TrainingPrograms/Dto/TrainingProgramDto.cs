using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingPrograms.Dto
{
	[AutoMap(typeof(TrainingProgram))]
	public class TrainingProgramDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "TrainingProgramNameRequired")]
		[StringLength(200,ErrorMessage="TrainingProgramNameMaxLength")]
		public string Name { get; set; }
						
		public DateTime? From { get; set; }
						
		public DateTime? To { get; set; }
						
		[Required(ErrorMessage = "TrainingProgramPhaseIdRequired")]
		public Guid PhaseId { get; set; }
				public string PhaseName { get; set; }
				
		[Required(ErrorMessage = "TrainingProgramIsActiveRequired")]
		public bool IsActive { get; set; }
						
		[StringLength(200,ErrorMessage="TrainingProgramAttendanceTimeMaxLength")]
		public string AttendanceTime { get; set; }
						
		[StringLength(128,ErrorMessage="TrainingProgramRoleIdMaxLength")]
		public string RoleId { get; set; }
		

	}
}