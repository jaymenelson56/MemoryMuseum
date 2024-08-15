using Microsoft.AspNetCore.Identity;

namespace MemoryMuseum.Models.DTOs;

public class UserProfileDTO
{
    public int Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public DateTime CreateDateTime { get; set; }

    public string UserName { get; set; }
    public List<string> Roles { get; set; }

    public bool IsActive { get; set; }


    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }
    public List<ExhibitDTO>? Exhibits { get; set; }
    public List<ExhibitRatingDTO>? ExhibitRatings { get; set; }
    public string FullName
    {
        get
        {
            return $"{FirstName} {LastName}";
        }
    }


}