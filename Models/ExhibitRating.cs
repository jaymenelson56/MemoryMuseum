using System.ComponentModel.DataAnnotations;

namespace MemoryMuseum.Models;

public class ExhibitRating
{
    [Required]
    public int ExhibitId { get; set; }
    [Required]
    public int RatingId { get; set; }
    [Required]
    public int UserProfileId { get; set; }
}