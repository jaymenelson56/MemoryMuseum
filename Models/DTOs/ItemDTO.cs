namespace MemoryMuseum.Models.DTOs;

public class ItemDTO
{
    public int Id { get; set; }
    public string Image { get; set; }
    public string Name { get; set; }
    public int UserProfileId { get; set; }
    public int ExhibitId { get; set; }
    public string Placard { get; set; }
    public DateTime DatePublished { get; set; }
    public bool NeedsApproval { get; set; }
    public bool Approved { get; set; }
    public ExhibitDTO Exhibit { get; set; }
    public UserProfileDTO UserProfile { get; set; }
}