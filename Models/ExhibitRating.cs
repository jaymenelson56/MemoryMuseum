using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MemoryMuseum.Models;

public class ExhibitRating
{
    [Required]
    public int ExhibitId { get; set; }
    [Required]
    public int RatingId { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    [ForeignKey(nameof(RatingId))]
    public Rating? Rating { get; set; }
    [ForeignKey(nameof(ExhibitId))]
    public Exhibit? Exhibit { get; set; }
    [ForeignKey(nameof(UserProfileId))]
    public UserProfile? UserProfile { get; set; }
}