using System.ComponentModel.DataAnnotations;
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
        public string IdentityUserId { get; set; }

        public IdentityUser IdentityUser { get; set; }
        public List<Exhibit>? Exhibits { get; set; }
    }
}