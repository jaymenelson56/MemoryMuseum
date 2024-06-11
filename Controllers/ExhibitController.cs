using MemoryMuseum.Data;
using MemoryMuseum.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using MemoryMuseum.Models;

namespace MemoryMuseum.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ExhibitController : ControllerBase
{
    private MemoryMuseumDbContext _dbContext;

    public ExhibitController(MemoryMuseumDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    //[Authorize]

    public IActionResult Get()
    {
        return Ok(_dbContext
        .Exhibits
        .Select(e => new ExhibitDTO
        {
            Id = e.Id,
            Name = e.Name,
            UserProfileId = e.UserProfileId

        })
        .ToList());
    }

    [HttpGet("details")]
    //[Authorize]

    public IActionResult GetAllWithDetails()
    {
        {
            List<ExhibitDTO> exhibits = _dbContext.Exhibits
                .Include(e => e.UserProfile)
                .ThenInclude(up => up.IdentityUser)
                .Include(e => e.Ratings)
                    .ThenInclude(er => er.Rating)
                .Include(e => e.Ratings)
                .Select(e => new ExhibitDTO
                {
                    Id = e.Id,
                    Name = e.Name,
                    UserProfileId = e.UserProfileId,
                    UserProfile = new UserProfileDTO
                    {
                        Id = e.UserProfile.Id,
                        FirstName = e.UserProfile.FirstName,
                        LastName = e.UserProfile.LastName,
                        Address = e.UserProfile.Address,
                        Email = e.UserProfile.IdentityUser.Email,
                        CreateDateTime = e.UserProfile.CreateDateTime,
                        UserName = e.UserProfile.IdentityUser.UserName,
                        IdentityUserId = e.UserProfile.IdentityUserId
                    },
                    Ratings = e.Ratings.Select(er => new ExhibitRatingDTO
                    {
                        ExhibitId = er.ExhibitId,
                        RatingId = er.RatingId,
                        UserProfileId = er.UserProfileId,
                        Rating = new RatingDTO
                        {
                            Id = er.Rating.Id,
                            RatingName = er.Rating.RatingName,
                            Value = er.Rating.Value
                        },
                    }).ToList()
                }).ToList();

            return Ok(exhibits);
        }
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetExhibitById(int id)
    {
        ExhibitDTO? exhibit = _dbContext.Exhibits
            .Include(e => e.UserProfile)
                .ThenInclude(up => up.IdentityUser)
            .Include(e => e.Ratings)
            .Include(e => e.Ratings)
            .Include(e => e.Items) // Include the Items
            .Where(e => e.Id == id)
            .Select(e => new ExhibitDTO
            {
                Id = e.Id,
                Name = e.Name,
                UserProfileId = e.UserProfileId,
                UserProfile = new UserProfileDTO
                {
                    Id = e.UserProfile.Id,
                    FirstName = e.UserProfile.FirstName,
                    LastName = e.UserProfile.LastName,
                    Address = e.UserProfile.Address,
                    Email = e.UserProfile.IdentityUser.Email,
                    CreateDateTime = e.UserProfile.CreateDateTime,
                    UserName = e.UserProfile.IdentityUser.UserName,
                    IdentityUserId = e.UserProfile.IdentityUserId
                },
                Ratings = e.Ratings.Select(er => new ExhibitRatingDTO
                {
                    ExhibitId = er.ExhibitId,
                    RatingId = er.RatingId,
                    UserProfileId = er.UserProfileId,
                }).ToList(),
                Items = e.Items.Select(i => new ItemDTO
                {
                    Id = i.Id,
                    Image = i.Image,
                    Name = i.Name,
                    Placard = i.Placard,
                    DatePublished = i.DatePublished,
                    NeedsApproval = i.NeedsApproval,
                    Approved = i.Approved,
                    UserProfileId = i.UserProfileId,
                    ExhibitId = i.ExhibitId,
                }).ToList()
            }).FirstOrDefault();

        if (exhibit == null)
        {
            return NotFound();
        }

        return Ok(exhibit);
    }
}