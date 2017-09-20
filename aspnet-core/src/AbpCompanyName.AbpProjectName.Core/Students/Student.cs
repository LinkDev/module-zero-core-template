using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace AbpCompanyName.AbpProjectName
{
    public class Student : Entity, IPassivable, ISoftDelete
    {

        [Required]
        public int Age { get; set; }

        [Required]
        public string Bio { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        public int RoleId { get; set; }

        public int? ParentId { get; set; }

        public virtual Student Parent { get; set; }
        public virtual Collection<Department> Departments { get; set; }
        public virtual Collection<Student> Students { get; set; }

    }
}