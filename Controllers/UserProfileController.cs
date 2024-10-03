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
        .OrderBy(up => up.CreateDateTime)
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfile
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Address = up.Address,
            IsActive = up.IsActive,
            AdminApproved = up.AdminApproved,
            AdminApprovedId = up.AdminApprovedId,
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
            .Where(up => up.Id == id)
            .Include(up => up.IdentityUser)
            .Include(up => up.Exhibits) // Include Exhibits
            .Select(up => new UserProfile
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                Address = up.Address,
                CreateDateTime = up.CreateDateTime,
                IsActive = up.IsActive,
                AdminApproved = up.AdminApproved,
                AdminApprovedId = up.AdminApprovedId,
                Email = up.IdentityUser.Email,
                UserName = up.IdentityUser.UserName,
                IdentityUserId = up.IdentityUserId,
                Roles = _dbContext.UserRoles
                    .Where(ur => ur.UserId == up.IdentityUserId)
                    .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
                    .ToList(),
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

    [HttpPut("ToggleIsActive/{id}")]
    public IActionResult ToggleIsActive(int id)
    {
        var userProfile = _dbContext.UserProfiles.FirstOrDefault(up => up.Id == id);

        if (userProfile == null)
        {
            return NotFound();
        }

        userProfile.IsActive = !userProfile.IsActive;
        _dbContext.SaveChanges();

        return Ok(userProfile);
    }

    [HttpPost("promote/{id}")]
    // [Authorize(Roles = "Admin")]

    public IActionResult Promote(string id, int profileId)
    {
        IdentityRole role = _dbContext.Roles.SingleOrDefault(r => r.Name == "Admin");
        UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == profileId);
        userProfile.AdminApproved = false;
        userProfile.AdminApprovedId = 0;

        _dbContext.UserRoles.Add(new IdentityUserRole<string>
        {
            RoleId = role.Id,
            UserId = id
        });
        _dbContext.SaveChanges();
        return NoContent();
    }
    [HttpPost("demote/{id}")]
    [Authorize(Roles = "Admin")]

    public IActionResult Demote(string id, int adminId)
    {
        IdentityRole role = _dbContext.Roles.SingleOrDefault(r => r.Name == "Admin");
        if (role == null)
        {
            return NotFound("Admin role not found");
        }

        UserProfile userProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == adminId);
        if (userProfile == null)
        {
            return NotFound("User profile not found");
        }

        userProfile.AdminApproved = false;
        userProfile.AdminApprovedId = 0;

        IdentityUserRole<string> userRole = _dbContext
        .UserRoles
        .SingleOrDefault(ur =>
            ur.RoleId == role.Id &&
            ur.UserId == id);

        if (userRole == null)
        {
            return NotFound("User role not found");
        }

        _dbContext.UserRoles.Remove(userRole);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPut("{id}/request")]
    [Authorize(Roles = "Admin")]

    public IActionResult Request(int id, int approverId)
    {
        UserProfile user = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);

        if (user == null)
        {
            return NotFound("User not found");
        }

        if (!user.AdminApproved)
        {
            user.AdminApproved = true;
            user.AdminApprovedId = approverId;
            _dbContext.SaveChanges();
        }
        return NoContent();
    }

    [HttpPut("{id}/deny")]
    [Authorize(Roles = "Admin")]

    public IActionResult Deny(int id)
    {
        UserProfile user = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == id);

        if (user == null)
        {
            return NotFound("User not found");
        }

        if (user.AdminApproved)
        {
            user.AdminApproved = false;
            user.AdminApprovedId = 0;
            _dbContext.SaveChanges();
        }

        return NoContent();
    }
}