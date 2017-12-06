using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingExams.Dto
{
	[AutoMap(typeof(TrainingExam))]
	public class TrainingExamDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "TrainingExamNameRequired")]
		[StringLength(250,ErrorMessage="TrainingExamNameMaxLength")]
		public string Name { get; set; }
						
		[Required(ErrorMessage = "TrainingExamTrainingProgramIdRequired")]
		public Guid TrainingProgramId { get; set; }
				public string TrainingProgramName { get; set; }
				
		[Required(ErrorMessage = "TrainingExamIsActiveRequired")]
		public bool IsActive { get; set; }
						
		[Required(ErrorMessage = "TrainingExamOrderRequired")]
		public int Order { get; set; }
		

	}
}