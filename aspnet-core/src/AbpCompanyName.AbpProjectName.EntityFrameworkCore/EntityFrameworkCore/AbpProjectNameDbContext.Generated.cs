using Abp.Zero.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore
{
    public partial class AbpProjectNameDbContext 
    {
		public virtual DbSet<DomainGroup> DomainGroups { get; set; }
		public virtual DbSet<Domain> Domains { get; set; }
		public virtual DbSet<QuestionAnswer> QuestionAnswers { get; set; }
		public virtual DbSet<Question> Questions { get; set; }
		public virtual DbSet<QuestionGroup> QuestionGroups { get; set; }
		public virtual DbSet<Survey> Surveys { get; set; }
		
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
			base.OnModelCreating(modelBuilder);

 
 
			modelBuilder.Entity<DomainGroup>()
				.Property("Id")
				.HasColumnName("DomainGroupId");
 
 
			modelBuilder.Entity<Domain>()
				.Property("Id")
				.HasColumnName("DomainId");
 
 
			modelBuilder.Entity<QuestionAnswer>()
				.Property("Id")
				.HasColumnName("QuestionAnswerId");
 
 
			modelBuilder.Entity<Question>()
				.Property("Id")
				.HasColumnName("QuestionId");
 
 
			modelBuilder.Entity<QuestionGroup>()
				.Property("Id")
				.HasColumnName("QuestionGroupId");
 
 
			modelBuilder.Entity<Survey>()
				.Property("Id")
				.HasColumnName("SurveyId");


			modelBuilder.Entity<Domain>()
				.HasOne(typeof(DomainGroup), "DomainGroup")
				.WithMany("Domains")
                .HasForeignKey("DomainGroupId");

			modelBuilder.Entity<Question>()
				.HasOne(typeof(DomainGroup), "DomainGroup")
				.WithMany("Questions")
                .HasForeignKey("DomainGroupId");

			modelBuilder.Entity<Domain>()
				.HasOne(typeof(Domain), "ParentDomain")
				.WithMany("Domains")
                .HasForeignKey("ParentDomainId");

			modelBuilder.Entity<QuestionAnswer>()
				.HasOne(typeof(Question), "Question")
				.WithMany("QuestionAnswers")
                .HasForeignKey("QuestionId");

			modelBuilder.Entity<Question>()
				.HasOne(typeof(QuestionGroup), "QuestionGroup")
				.WithMany("Questions")
                .HasForeignKey("QuestionGroupId");

			modelBuilder.Entity<QuestionGroup>()
				.HasOne(typeof(Survey), "Survey")
				.WithMany("QuestionGroups")
                .HasForeignKey("SurveyId");

			modelBuilder.Entity<Survey>()
				.HasOne(typeof(Survey), "ParentSurvey")
				.WithMany("Surveys")
                .HasForeignKey("ParentSurveyId");

        }
    }
}