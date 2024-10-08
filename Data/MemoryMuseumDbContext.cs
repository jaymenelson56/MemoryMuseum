using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using MemoryMuseum.Models;
using Microsoft.AspNetCore.Identity;

namespace MemoryMuseum.Data;
public class MemoryMuseumDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Exhibit> Exhibits { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<Rating> Ratings { get; set; }
    public DbSet<ExhibitRating> ExhibitRatings { get; set; }
    public DbSet<Report> Reports { get; set; }

    public MemoryMuseumDbContext(DbContextOptions<MemoryMuseumDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]
        {
                new IdentityUser
                {
                    Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                    UserName = "JaymeChaka",
                    Email = "jayme@chaka.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                    UserName = "KayaGaba",
                    Email = "kaya@gaba.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "a7d21fac-3b21-454a-a747-075f072d0cf3",
                    UserName = "FoxGaba",
                    Email = "fox@gaba.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                    UserName = "BongoGaba",
                    Email = "bongo@gaba.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                    UserName = "JerryGaba",
                    Email = "jerry@gaba.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
        });





        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>[]
            {
                new IdentityUserRole<string>
                {
                    RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                    UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                    UserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                    UserId = "a7d21fac-3b21-454a-a747-075f072d0cf3"
                },
            });

        modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
   {
        new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Jayme",
            LastName = "Chaka",
            Address = "101 Dalmations",
            CreateDateTime = new DateTime(2024, 1, 1, 14, 30, 0),
            IsActive = true,
            AdminApproved = false,
            AdminApprovedId = 0
        },
        new UserProfile
        {
            Id = 2,
            IdentityUserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
            FirstName = "Kaya",
            LastName = "Chaka",
            Address = "101 Dalmations",
            CreateDateTime = new DateTime(2024, 1, 1, 14, 30, 0),
            IsActive = true,
            AdminApproved = false,
            AdminApprovedId = 0
        },
        new UserProfile
        {
            Id = 3,
            IdentityUserId = "a7d21fac-3b21-454a-a747-075f072d0cf3",
            FirstName = "Fox",
            LastName = "Gaba",
            Address = "101 Dalmations",
            CreateDateTime = new DateTime(2024, 6, 1, 14, 30, 0),
            IsActive = true,
            AdminApproved = false,
            AdminApprovedId = 0
        },
        new UserProfile
        {
            Id = 4,
            IdentityUserId = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
            FirstName = "Bongo",
            LastName = "Chaka",
            Address = "101 Ramen Way",
            CreateDateTime = new DateTime(2024, 8, 1, 14, 30, 0),
            IsActive = false,
            AdminApproved = false,
            AdminApprovedId = 0
        },
        new UserProfile
        {
            Id = 5,
            IdentityUserId = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
            FirstName = "Jerry",
            LastName = "Chaka",
            Address = "101 Bell Blvd",
            CreateDateTime = new DateTime(2024, 8, 1, 14, 30, 0),
            IsActive = false,
            AdminApproved = false,
            AdminApprovedId = 0
        },

   });


        modelBuilder.Entity<Exhibit>().HasData(new Exhibit[]
        {
        new Exhibit
        {
            Id = 1,
            Name = "Hall of Games",
            UserProfileId = 1
        },
        new Exhibit
        {
            Id = 2,
            Name = "Hall of Dog Toys",
            UserProfileId = 2
        },
        new Exhibit
        {
            Id = 3,
            Name = "Hall of Dog Stuff I Found",
            UserProfileId = 3
        },
        new Exhibit
        {
            Id = 4,
            Name = "Hall of Noodles",
            UserProfileId = 4
        },
        });


        modelBuilder.Entity<Item>().HasData(new Item[]
        {
        new Item
        {
            Id = 1,
            Image = "/images/gameandwatch.jpg",
            Name = "Game and Watch",
            UserProfileId = 1,
            ExhibitId = 1,
            Placard = "Although this was made back in 2020, this machine mimics those built in the 1980s. This one is Mario themed and contains the game ball, as well as Super Mario Bros, and Super Mario Bros. 2(Lost Levels) They didn't have that back then!",
            DatePublished = new DateTime(2024, 6, 2, 14, 30, 0),
            NeedsApproval = false,
            Approved = true
        },
        new Item
        {
            Id = 2,
            Image = "/images/nintendods.jpg",
            Name = "Nintendo DS",
            UserProfileId = 1,
            ExhibitId = 1,
            Placard = "First Released in 2004, this one has wear and tear on it, literally. The screen has been worn. During some of the best years in gaming this device has seen better days.",
            DatePublished = new DateTime(2024, 6, 2, 14, 30, 0),
            NeedsApproval = false,
            Approved = true
        },
        new Item
        {
            Id = 3,
            Image = "/images/woodywoodpecker.jpg",
            Name = "Woody Woodpecker toy",
            UserProfileId = 2,
            ExhibitId = 2,
            Placard = "This is my favorite toy in life. Woody the Woodpecker. Jayme actually bought me three of these this is the third one. He does his trade mark laugh drives me mad.",
            DatePublished = new DateTime(2024, 6, 2, 14, 30, 0),
            NeedsApproval = false,
            Approved = true
        },
        new Item
        {
            Id = 4,
            Image = "/images/pyroraptortoy.jpg",
            Name = "Pyro Raptor Toy",
            UserProfileId = 2,
            ExhibitId = 2,
            Placard = "From that Jurrassic movie I never saw. I really loved this toy. So I am putting it here on display for you all. Please do not squeak it.",
            DatePublished = new DateTime(2024, 6, 2, 14, 30, 0),
            NeedsApproval = false,
            Approved = true
        },
        new Item
        {
            Id = 5,
            Image = "/images/darkdoorway.jpg",
            Name = "Hidden Doorway",
            UserProfileId = 3,
            ExhibitId = 3,
            Placard = "This creepy door has a bunch of cool stuff. I get my exhibit items here",
            DatePublished = new DateTime(2024, 6, 2, 14, 30, 0),
            NeedsApproval = false,
            Approved = true
        },
        new Item
        {
            Id = 6,
            Image = "/images/gumbyplay.jpg",
            Name = "Gumby Toy",
            UserProfileId = 3,
            ExhibitId = 3,
            Placard = "I am pretty sure this is Gumby.",
            DatePublished = new DateTime(2024, 6, 2, 14, 30, 0),
            NeedsApproval = false,
            Approved = true
        },
        new Item
        {
            Id = 7,
            Image = "/images/chung.png",
            Name = "Big Chungus",
            UserProfileId = 4,
            ExhibitId = 4,
            Placard = "I am pretty sure this is Bugs Bunny.",
            DatePublished = new DateTime(2024, 8, 1, 14, 30, 0),
            NeedsApproval = false,
            Approved = true
        },
        new Item
        {
            Id = 8,
            Image = "/images/turkey.jpg",
            Name = "A Turkey",
            UserProfileId = 5,
            ExhibitId = 4,
            Placard = "I am pretty sure this is a turkey.",
            DatePublished = new DateTime(2024, 8, 1, 14, 30, 0),
            NeedsApproval = false,
            Approved = true
        },
        new Item
        {
            Id = 9,
            Image = "/images/beads.jpg",
            Name = "A Turkey",
            UserProfileId = 3,
            ExhibitId = 4,
            Placard = "I am pretty sure this is beads.",
            DatePublished = new DateTime(2024, 8, 1, 14, 30, 0),
            NeedsApproval = false,
            Approved = true
        },
        });


        modelBuilder.Entity<Rating>().HasData(new Rating[]
        {
        new Rating
        {
            Id = 1,
            RatingName = "Needs work",
            Value = 1
        },
        new Rating
        {
            Id = 2,
            RatingName = "Could be better",
            Value = 2
        },
        new Rating
        {
            Id = 3,
            RatingName = "Okay",
            Value = 3
        },
        new Rating
        {
            Id = 4,
            RatingName = "Good",
            Value = 4
        },
        new Rating
        {
            Id = 5,
            RatingName = "Awesome",
            Value = 5
        },
        });

        modelBuilder.Entity<Report>().HasData(new Report[]
        {
        new Report
        {
            Id = 1,
            Body = "Fox is a good boy",
            ReportAuthorId = 1,
            ReportSubjectId = 3,
            Closed= true
        },
        });


        modelBuilder.Entity<ExhibitRating>().HasKey(er => new { er.ExhibitId, er.RatingId, er.UserProfileId });

        modelBuilder.Entity<ExhibitRating>()
            .HasOne(er => er.Exhibit)
            .WithMany(e => e.ExhibitRatings)
            .HasForeignKey(er => er.ExhibitId);
        modelBuilder.Entity<ExhibitRating>()
            .HasOne(er => er.Rating)
            .WithMany(r => r.ExhibitRatings)
            .HasForeignKey(er => er.RatingId);
        modelBuilder.Entity<ExhibitRating>()
            .HasOne(er => er.UserProfile)
            .WithMany(up => up.ExhibitRatings)
            .HasForeignKey(er => er.UserProfileId);
    }
}