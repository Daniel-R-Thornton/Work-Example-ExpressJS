using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddFundingSourceRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FundingSource",
                table: "Clients");

            migrationBuilder.AddColumn<int>(
                name: "FundingSourceId",
                table: "Clients",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Clients_FundingSourceId",
                table: "Clients",
                column: "FundingSourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_FundingSources_FundingSourceId",
                table: "Clients",
                column: "FundingSourceId",
                principalTable: "FundingSources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_FundingSources_FundingSourceId",
                table: "Clients");

            migrationBuilder.DropIndex(
                name: "IX_Clients_FundingSourceId",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "FundingSourceId",
                table: "Clients");

            migrationBuilder.AddColumn<string>(
                name: "FundingSource",
                table: "Clients",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
