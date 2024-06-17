using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;

namespace MemoryMuseum.Models;

public class Rating
{
    public int Id { get; set; }

    [Required]
    public string RatingName { get; set; }
    [Required]
    [Range(1, 5, ErrorMessage = "The value must be between 1 and 5.")]
    public int Value { get; set; }
    public List<ExhibitRating>? ExhibitRatings { get; set; }
}