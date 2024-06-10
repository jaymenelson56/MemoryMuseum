namespace MemoryMuseum.Models.DTOs;

public class ExhibitDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int UserProfileId { get; set; }
    public UserProfileDTO UserProfile { get; set; }
    public List<ItemDTO>? Items { get; set; }
    public List<ExhibitDTO>? Exhibits { get; set; }
}