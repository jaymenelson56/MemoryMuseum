using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace MemoryMuseum.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }

        [Required]
        public string Address { get; set; }
        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public string IdentityUserId { get; set; }
        [NotMapped]
        public string UserName { get; set; }

        [NotMapped]
        public string Email { get; set; }

        [NotMapped]
        public List<string> Roles { get; set; }

        public IdentityUser IdentityUser { get; set; }
        public List<Exhibit>? Exhibits { get; set; }
        public List<ExhibitRating>? Ratings { get; set; }
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}