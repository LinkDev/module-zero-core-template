using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.LogActionTypes.Dto
{
	[AutoMap(typeof(LogActionType))]
	public class LogActionTypeDto : EntityDto
	{
				
		[StringLength(150,ErrorMessage="LogActionTypeNameMaxLength")]
		public string Name { get; set; }
		

	}
}