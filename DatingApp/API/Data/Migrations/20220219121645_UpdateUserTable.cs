using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class UpdateUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastActice",
                table: "Users",
                newName: "LastActive");

            migrationBuilder.RenameColumn(
                name: "Intrests",
                table: "Users",
                newName: "KnownAs");

            migrationBuilder.RenameColumn(
                name: "FavoriteSong",
                table: "Users",
                newName: "Interests");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastActive",
                table: "Users",
                newName: "LastActice");

            migrationBuilder.RenameColumn(
                name: "KnownAs",
                table: "Users",
                newName: "Intrests");

            migrationBuilder.RenameColumn(
                name: "Interests",
                table: "Users",
                newName: "FavoriteSong");
        }
    }
}
