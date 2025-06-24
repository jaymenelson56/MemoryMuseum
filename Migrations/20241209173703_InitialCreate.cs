using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MemoryMuseum.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RatingName = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    CreateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    IdentityUserId = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    AdminApproved = table.Column<bool>(type: "boolean", nullable: false),
                    AdminApprovedId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfiles_AspNetUsers_IdentityUserId",
                        column: x => x.IdentityUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Exhibits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exhibits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Exhibits_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Body = table.Column<string>(type: "text", nullable: true),
                    ReportAuthorId = table.Column<int>(type: "integer", nullable: false),
                    ReportSubjectId = table.Column<int>(type: "integer", nullable: false),
                    Closed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reports_UserProfiles_ReportAuthorId",
                        column: x => x.ReportAuthorId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reports_UserProfiles_ReportSubjectId",
                        column: x => x.ReportSubjectId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExhibitRatings",
                columns: table => new
                {
                    ExhibitId = table.Column<int>(type: "integer", nullable: false),
                    RatingId = table.Column<int>(type: "integer", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExhibitRatings", x => new { x.ExhibitId, x.RatingId, x.UserProfileId });
                    table.ForeignKey(
                        name: "FK_ExhibitRatings_Exhibits_ExhibitId",
                        column: x => x.ExhibitId,
                        principalTable: "Exhibits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExhibitRatings_Ratings_RatingId",
                        column: x => x.RatingId,
                        principalTable: "Ratings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExhibitRatings_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Image = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    ExhibitId = table.Column<int>(type: "integer", nullable: false),
                    Placard = table.Column<string>(type: "text", nullable: true),
                    DatePublished = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    NeedsApproval = table.Column<bool>(type: "boolean", nullable: false),
                    Approved = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Exhibits_ExhibitId",
                        column: x => x.ExhibitId,
                        principalTable: "Exhibits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Items_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", null, "Admin", "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "9ce89d88-75da-4a80-9b0d-3fe58582b8e2", 0, "779004b6-4243-42f3-ba05-929d22e6e7fb", "jerry@gaba.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEF13uVi/cEB922B1Ohd22CBB1hzkt8wsId0KCNdGfjjvJsGQqv9/9dgMTgA7Orcimw==", null, false, "31e522b6-c49a-4a8c-8baf-fae9100be89f", false, "JerryGaba" },
                    { "a7d21fac-3b21-454a-a747-075f072d0cf3", 0, "9f762e9d-16aa-4cc2-a2b1-7c1a9dd88e8d", "fox@gaba.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEBwANDJ7zrVWkLmhF20jUIDKXj/HmZlh2CW7frl3SHlUK2cjANAO1zWoCe+i8hfbjQ==", null, false, "ece56a21-e3a8-4933-8e88-500f9d5bee38", false, "FoxGaba" },
                    { "c806cfae-bda9-47c5-8473-dd52fd056a9b", 0, "aeb130b8-a7d1-43eb-9235-254fde29fc27", "bongo@gaba.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEN1Q2JJW5sFahRHMk2WoJm9ITsUTrWdcWFDar2qQkyCEzOphPuAE1UVkYxPn2NDwuw==", null, false, "48fe53fe-b20a-45fb-a8f3-7582ae2bcf3f", false, "BongoGaba" },
                    { "d8d76512-74f1-43bb-b1fd-87d3a8aa36df", 0, "77d3f359-deef-410f-9625-a46669aa12f3", "kaya@gaba.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAECojyyRKaoSx0tWVM2+8K2p9iqJiIZ7Hg6eDribm7P0jwkNtwWWc9ciN15rBA6Qaww==", null, false, "db84a049-b0e9-48aa-850b-b45f2141ae44", false, "KayaGaba" },
                    { "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", 0, "ea601200-c2a7-4422-8aec-65b9e3c9f544", "jayme@chaka.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEKms7OV6l7TKsplZsRgA4Rw+ICJO3I0Ep5ImgSr/ij1HqN8yb0m+XZuFrVcYRuxBpw==", null, false, "2c18643d-7eb2-4268-a820-716adf569863", false, "JaymeChaka" }
                });

            migrationBuilder.InsertData(
                table: "Ratings",
                columns: new[] { "Id", "RatingName", "Value" },
                values: new object[,]
                {
                    { 1, "Needs work", 1 },
                    { 2, "Could be better", 2 },
                    { 3, "Okay", 3 },
                    { 4, "Good", 4 },
                    { 5, "Awesome", 5 }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "a7d21fac-3b21-454a-a747-075f072d0cf3" },
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "d8d76512-74f1-43bb-b1fd-87d3a8aa36df" },
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" }
                });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "Address", "AdminApproved", "AdminApprovedId", "CreateDateTime", "FirstName", "IdentityUserId", "IsActive", "LastName" },
                values: new object[,]
                {
                    { 1, "101 Dalmations", false, 0, new DateTime(2024, 1, 1, 14, 30, 0, 0, DateTimeKind.Unspecified), "Jayme", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", true, "Chaka" },
                    { 2, "101 Dalmations", false, 0, new DateTime(2024, 1, 1, 14, 30, 0, 0, DateTimeKind.Unspecified), "Kaya", "d8d76512-74f1-43bb-b1fd-87d3a8aa36df", true, "Chaka" },
                    { 3, "101 Dalmations", false, 0, new DateTime(2024, 6, 1, 14, 30, 0, 0, DateTimeKind.Unspecified), "Fox", "a7d21fac-3b21-454a-a747-075f072d0cf3", true, "Gaba" },
                    { 4, "101 Ramen Way", false, 0, new DateTime(2024, 8, 1, 14, 30, 0, 0, DateTimeKind.Unspecified), "Bongo", "c806cfae-bda9-47c5-8473-dd52fd056a9b", false, "Chaka" },
                    { 5, "101 Bell Blvd", false, 0, new DateTime(2024, 8, 1, 14, 30, 0, 0, DateTimeKind.Unspecified), "Jerry", "9ce89d88-75da-4a80-9b0d-3fe58582b8e2", false, "Chaka" }
                });

            migrationBuilder.InsertData(
                table: "Exhibits",
                columns: new[] { "Id", "Name", "UserProfileId" },
                values: new object[,]
                {
                    { 1, "Hall of Games", 1 },
                    { 2, "Hall of Dog Toys", 2 },
                    { 3, "Hall of Dog Stuff I Found", 3 },
                    { 4, "Hall of Noodles", 4 }
                });

            migrationBuilder.InsertData(
                table: "Reports",
                columns: new[] { "Id", "Body", "Closed", "ReportAuthorId", "ReportSubjectId" },
                values: new object[] { 1, "Fox is a good boy", true, 1, 3 });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "Approved", "DatePublished", "ExhibitId", "Image", "Name", "NeedsApproval", "Placard", "UserProfileId" },
                values: new object[,]
                {
                    { 1, true, new DateTime(2024, 6, 2, 14, 30, 0, 0, DateTimeKind.Unspecified), 1, "/images/gameandwatch.jpg", "Game and Watch", false, "Although this was made back in 2020, this machine mimics those built in the 1980s. This one is Mario themed and contains the game ball, as well as Super Mario Bros, and Super Mario Bros. 2(Lost Levels) They didn't have that back then!", 1 },
                    { 2, true, new DateTime(2024, 6, 2, 14, 30, 0, 0, DateTimeKind.Unspecified), 1, "/images/nintendods.jpg", "Nintendo DS", false, "First Released in 2004, this one has wear and tear on it, literally. The screen has been worn. During some of the best years in gaming this device has seen better days.", 1 },
                    { 3, true, new DateTime(2024, 6, 2, 14, 30, 0, 0, DateTimeKind.Unspecified), 2, "/images/woodywoodpecker.jpg", "Woody Woodpecker toy", false, "This is my favorite toy in life. Woody the Woodpecker. Jayme actually bought me three of these this is the third one. He does his trade mark laugh drives me mad.", 2 },
                    { 4, true, new DateTime(2024, 6, 2, 14, 30, 0, 0, DateTimeKind.Unspecified), 2, "/images/pyroraptortoy.jpg", "Pyro Raptor Toy", false, "From that Jurrassic movie I never saw. I really loved this toy. So I am putting it here on display for you all. Please do not squeak it.", 2 },
                    { 5, true, new DateTime(2024, 6, 2, 14, 30, 0, 0, DateTimeKind.Unspecified), 3, "/images/darkdoorway.jpg", "Hidden Doorway", false, "This creepy door has a bunch of cool stuff. I get my exhibit items here", 3 },
                    { 6, true, new DateTime(2024, 6, 2, 14, 30, 0, 0, DateTimeKind.Unspecified), 3, "/images/gumbyplay.jpg", "Gumby Toy", false, "I am pretty sure this is Gumby.", 3 },
                    { 7, true, new DateTime(2024, 8, 1, 14, 30, 0, 0, DateTimeKind.Unspecified), 4, "/images/chung.png", "Big Chungus", false, "I am pretty sure this is Bugs Bunny.", 4 },
                    { 8, true, new DateTime(2024, 8, 1, 14, 30, 0, 0, DateTimeKind.Unspecified), 4, "/images/turkey.jpg", "A Turkey", false, "I am pretty sure this is a turkey.", 5 },
                    { 9, true, new DateTime(2024, 8, 1, 14, 30, 0, 0, DateTimeKind.Unspecified), 4, "/images/beads.jpg", "A Turkey", false, "I am pretty sure this is beads.", 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ExhibitRatings_RatingId",
                table: "ExhibitRatings",
                column: "RatingId");

            migrationBuilder.CreateIndex(
                name: "IX_ExhibitRatings_UserProfileId",
                table: "ExhibitRatings",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Exhibits_UserProfileId",
                table: "Exhibits",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_ExhibitId",
                table: "Items",
                column: "ExhibitId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_UserProfileId",
                table: "Items",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ReportAuthorId",
                table: "Reports",
                column: "ReportAuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ReportSubjectId",
                table: "Reports",
                column: "ReportSubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles",
                column: "IdentityUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "ExhibitRatings");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Reports");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Ratings");

            migrationBuilder.DropTable(
                name: "Exhibits");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
