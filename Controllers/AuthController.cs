using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using MemoryMuseum.Models;
using MemoryMuseum.Models.DTOs;
using MemoryMuseum.Data;

namespace MemoryMuseum.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private MemoryMuseumDbContext _dbContext;
    private UserManager<IdentityUser> _userManager;

    public AuthController(MemoryMuseumDbContext context, UserManager<IdentityUser> userManager)
    {
        _dbContext = context;
        _userManager = userManager;
    }

    [HttpPost("login")]
    public IActionResult Login([FromHeader(Name = "Authorization")] string authHeader)
    {
        try
        {
            string encodedCreds = authHeader.Substring(6).Trim();
            string creds = Encoding.GetEncoding("iso-8859-1").GetString(Convert.FromBase64String(encodedCreds));

            int separator = creds.IndexOf(':');
            string email = creds.Substring(0, separator);
            string password = creds.Substring(separator + 1);

            var user = _dbContext.Users.SingleOrDefault(u => u.Email == email);
            if (user == null) return Unauthorized();

            var userProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.IdentityUserId == user.Id);
            if (userProfile == null) return Unauthorized();

            var hasher = new PasswordHasher<IdentityUser>();
            var result = hasher.VerifyHashedPassword(user, user.PasswordHash, password);

            if (result == PasswordVerificationResult.Success)
            {
                var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email)
            };

                var userRoles = _dbContext.UserRoles.Where(ur => ur.UserId == user.Id).ToList();
                foreach (var userRole in userRoles)
                {
                    var role = _dbContext.Roles.FirstOrDefault(r => r.Id == userRole.RoleId);
                    if (role != null)
                    {
                        claims.Add(new Claim(ClaimTypes.Role, role.Name));
                    }
                }

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity)).Wait();

                var userDto = new UserProfileDTO
                {
                    Id = userProfile.Id,
                    FirstName = userProfile.FirstName,
                    LastName = userProfile.LastName,
                    Address = userProfile.Address,
                    IdentityUserId = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    IsActive = userProfile.IsActive,
                    Roles = userRoles.Select(ur => _dbContext.Roles.FirstOrDefault(r => r.Id == ur.RoleId)?.Name).ToList()
                };

                return Ok(userDto);
            }

            return Unauthorized();
        }
        catch (Exception ex)
        {
            // Log the exception if needed
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    [HttpGet]
    [Route("logout")]
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    public IActionResult Logout()
    {
        try
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme).Wait();
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500);
        }
    }

    [HttpGet("Me")]
    [Authorize]
    public IActionResult Me()
    {
        try
        {
            var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profile = _dbContext.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);
            if (profile == null) return NotFound();

            var roles = User.FindAll(ClaimTypes.Role).Select(r => r.Value).ToList();

            var userDto = new UserProfileDTO
            {
                Id = profile.Id,
                FirstName = profile.FirstName,
                LastName = profile.LastName,
                Address = profile.Address,
                IdentityUserId = identityUserId,
                UserName = User.FindFirstValue(ClaimTypes.Name),
                Email = User.FindFirstValue(ClaimTypes.Email),
                Roles = roles,
                IsActive = profile.IsActive
            };

            return Ok(userDto);
        }
        catch (Exception ex)
        {
            // Log the exception if needed
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegistrationDTO registration)
    {
        var user = new IdentityUser
        {
            UserName = registration.UserName,
            Email = registration.Email
        };

        var password = Encoding
            .GetEncoding("iso-8859-1")
            .GetString(Convert.FromBase64String(registration.Password));

        var result = await _userManager.CreateAsync(user, password);
        if (result.Succeeded)
        {
            _dbContext.UserProfiles.Add(new UserProfile
            {
                FirstName = registration.FirstName,
                LastName = registration.LastName,
                Address = registration.Address,
                IdentityUserId = user.Id,
                CreateDateTime = DateTime.Now,
                IsActive = true,
            });
            _dbContext.SaveChanges();

            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)

                };
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity)).Wait();

            return Ok();
        }
        return StatusCode(500);
    }
}