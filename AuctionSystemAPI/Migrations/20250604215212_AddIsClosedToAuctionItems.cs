using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuctionSystemAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddIsClosedToAuctionItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsClosed",
                table: "AuctionItems",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsClosed",
                table: "AuctionItems");
        }
    }
}
