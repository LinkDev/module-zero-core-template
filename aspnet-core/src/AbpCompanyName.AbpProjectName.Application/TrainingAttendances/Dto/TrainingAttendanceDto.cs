using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingAttendances.Dto
{
	[AutoMap(typeof(TrainingAttendance))]
	public class TrainingAttendanceDto : EntityDto<Guid>
	{
				
		public DateTime? Time { get; set; }
						
		public Guid? TrainingMemberId { get; set; }
				public string TrainingMemberName { get; set; }
				
		public Guid? TrainingProgramId { get; set; }
				public string TrainingProgramName { get; set; }


	}
}