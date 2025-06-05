using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuctionSystemAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddWinnerIdToAuctionItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "EndTime",
                table: "AuctionItems",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AddColumn<int>(
                name: "WinnerId",
                table: "AuctionItems",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AuctionItems_WinnerId",
                table: "AuctionItems",
                column: "WinnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_AuctionItems_Users_WinnerId",
                table: "AuctionItems",
                column: "WinnerId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuctionItems_Users_WinnerId",
                table: "AuctionItems");

            migrationBuilder.DropIndex(
                name: "IX_AuctionItems_WinnerId",
                table: "AuctionItems");

            migrationBuilder.DropColumn(
                name: "WinnerId",
                table: "AuctionItems");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndTime",
                table: "AuctionItems",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
