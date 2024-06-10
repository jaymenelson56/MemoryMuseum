using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using MemoryMuseum.Models;
using Microsoft.AspNetCore.Identity;

namespace MemoryMuseum.Data;
public class MemoryMuseumDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    public DbSet<UserProfile> UserProfiles { get; set; }

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
        });





        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
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
            CreateDateTime = new DateTime(2022, 6, 1)
        },
        new UserProfile
        {
            Id = 2,
            IdentityUserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
            FirstName = "Kaya",
            LastName = "Chaka",
            Address = "101 Dalmations",
            CreateDateTime = new DateTime(2022, 6, 1)
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
        });

        
        modelBuilder.Entity<Item>().HasData(new Item[]
        {
        new Item
        {
            Id = 1,
            Image = "https://example.com/image1.jpg",
            Name = "Game and Watch",
            UserProfileId = 1,
            ExhibitId = 1,
            Placard = "Although this was made back in 2020, this machine mimics those built in the 1980s. This one is Mario themed and contains the game ball, as well as Super Mario Bros, and Super Mario Bros. 2(Lost Levels) They didn't have that back then!",
            DatePublished = DateTime.Now,
            NeedsApproval = false,
            Approved = true
        },
        new Item
        {
            Id = 2,
            Image = "https://example.com/image2.jpg",
            Name = "Nintendo DS",
            UserProfileId = 1,
            ExhibitId = 1,
            Placard = "First Released in 2004, this one has wear and tear on it, literally. The screen has been worn. During some of the best years in gaming this device has seen better days.",
            DatePublished = DateTime.Now,
            NeedsApproval = false,
            Approved = true
        },
        new Item
        {
            Id = 3,
            Image = "https://example.com/image3.jpg",
            Name = "Dog Toy",
            UserProfileId = 2,
            ExhibitId = 2,
            Placard = "Had a lot of fun with this",
            DatePublished = DateTime.Now,
            NeedsApproval = false,
            Approved = true
        },
        new Item
        {
            Id = 4,
            Image = "https://example.com/image4.jpg",
            Name = "Dog Toy 2",
            UserProfileId = 2,
            ExhibitId = 2,
            Placard = "More fun.",
            DatePublished = DateTime.Now,
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

        
        modelBuilder.Entity<ExhibitRating>().HasKey(er => new { er.ExhibitId, er.RatingId, er.UserProfileId });

        modelBuilder.Entity<ExhibitRating>()
            .HasOne(er => er.Exhibit)
            .WithMany(e => e.Ratings)
            .HasForeignKey(er => er.ExhibitId);
        modelBuilder.Entity<ExhibitRating>()
            .HasOne(er => er.Rating)
            .WithMany(r => r.Ratings)
            .HasForeignKey(er => er.RatingId);
        modelBuilder.Entity<ExhibitRating>()
            .HasOne(er => er.UserProfile)
            .WithMany(up => up.Ratings)
            .HasForeignKey(er => er.UserProfileId);
    }
}