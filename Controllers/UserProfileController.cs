using Microsoft.AspNetCore.Mvc;
using MemoryMuseum.Models;
using MemoryMuseum.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace MemoryMuseum.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private MemoryMuseumDbContext _dbContext;

    public UserProfileController(MemoryMuseumDbContext context)
    {
        _dbContext = context;
    }
    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.UserProfiles
        .Where(up => up.IsActive)
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Address = up.Address,
            IsActive = up.IsActive,
            CreateDateTime = up.CreateDateTime,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId
        }));
    }
    [HttpGet("InactiveUsers")]
    // [Authorize]
    public IActionResult GetInactiveUsers()
    {
        return Ok(_dbContext.UserProfiles
        .Where(up => !up.IsActive)
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Address = up.Address,
            IsActive = up.IsActive,
            CreateDateTime = up.CreateDateTime,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId
        }));
    }

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetById(int id)
    {
        UserProfile? userProfile = _dbContext.UserProfiles
            .Where(up => up.Id == id && up.IsActive)
            .Include(up => up.IdentityUser)
            .Include(up => up.Exhibits) // Include Exhibits
            .Select(up => new UserProfile
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                Address = up.Address,
                CreateDateTime = up.CreateDateTime,
                IsActive= up.IsActive,
                Email = up.IdentityUser.Email,
                UserName = up.IdentityUser.UserName,
                IdentityUserId = up.IdentityUserId,
                Exhibits = up.Exhibits.Select(e => new Exhibit
                {
                    Id = e.Id,
                    Name = e.Name,
                    UserProfileId = e.UserProfileId,
                }).ToList()
            })
            .FirstOrDefault();

        if (userProfile == null)
        {
            return NotFound();
        }

        return Ok(userProfile);
    }
}