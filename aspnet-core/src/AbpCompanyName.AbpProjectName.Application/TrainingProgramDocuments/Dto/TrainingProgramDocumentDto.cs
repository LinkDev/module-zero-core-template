using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.TrainingProgramDocuments.Dto
{
	[AutoMap(typeof(TrainingProgramDocument))]
	public class TrainingProgramDocumentDto : EntityDto<Guid>
	{
				
		[Required(ErrorMessage = "TrainingProgramDocumentTrainingProgramIdRequired")]
		public Guid TrainingProgramId { get; set; }
				public string TrainingProgramName { get; set; }
				
		[Required(ErrorMessage = "TrainingProgramDocumentNameRequired")]
		[StringLength(250,ErrorMessage="TrainingProgramDocumentNameMaxLength")]
		public string Name { get; set; }
						
		[Required(ErrorMessage = "TrainingProgramDocumentFileRequired")]
		[StringLength(500,ErrorMessage="TrainingProgramDocumentFileMaxLength")]
		public string File { get; set; }
		

	}
}