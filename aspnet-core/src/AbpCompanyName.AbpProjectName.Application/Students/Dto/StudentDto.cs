using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;

namespace AbpCompanyName.AbpProjectName.Students.Dto
{
    [AutoMap(typeof(Student))]
    public class StudentDto : EntityDto
    {

        [Required]
        public int Age { get; set; }

        [Required]
        public string Bio { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        public int RoleId { get; set; }

        public int? ParentId { get; set; }
        public string ParentName { get; set; }


    }
}