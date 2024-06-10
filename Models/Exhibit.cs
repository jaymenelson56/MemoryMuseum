using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MemoryMuseum.Models;

public class Exhibit
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public int UserProfileId { get; set; }

    [ForeignKey(nameof(UserProfileId))]
    public UserProfile? UserProfile { get; set; }
    public List<Item>? Items { get; set; }
    public List<ExhibitRating>? Ratings { get; set; }
}
