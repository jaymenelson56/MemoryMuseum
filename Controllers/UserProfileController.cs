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
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Address = up.Address,
            CreateDateTime = up.CreateDateTime,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId
        }));
    }

}