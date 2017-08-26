using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AbpCompanyName.AbpProjectName.Migrations
{
    public partial class AddingStudentParentIdforeignkey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddForeignKey(
               name: "FK_Students_Students_ParentId",
               table: "Students",
               column: "ParentId",
               principalTable: "Students",
               principalColumn: "Id",
               onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Students_ParentId",
                table: "Students");
           
        }
    }
}
