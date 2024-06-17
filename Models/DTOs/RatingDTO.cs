using System.ComponentModel.DataAnnotations;

namespace MemoryMuseum.Models.DTOs;

public class RatingDTO
{
    public int Id { get; set; }
    public string RatingName { get; set; }

    [Range(1, 5, ErrorMessage = "The value must be between 1 and 5.")]
    public int Value { get; set; }
    public List<ExhibitRatingDTO>? ExhibitRatings { get; set; }
}