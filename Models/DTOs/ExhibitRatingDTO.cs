namespace MemoryMuseum.Models.DTOs;

public class ExhibitRatingDTO
{
    public int ExhibitId { get; set; }
    public int RatingId { get; set; }
    public int UserProfileId { get; set; }
    public RatingDTO? Rating { get; set; }
    public ExhibitDTO? Exhibit { get; set; }
    public UserProfileDTO? UserProfile { get; set; }

}