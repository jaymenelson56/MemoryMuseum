using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MemoryMuseum.Models;

public class Item
{
    public int Id { get; set; }
    public string? Image { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    [Required]
    public int ExhibitId { get; set; }
    public string? Placard { get; set; }
    [Required]
    public DateTime DatePublished { get; set; }
    public bool NeedsApproval { get; set; }
    public bool Approved { get; set; }
    [ForeignKey(nameof(ExhibitId))]
    public Exhibit Exhibit { get; set; }
    [ForeignKey(nameof(UserProfileId))]
    public UserProfile UserProfile { get; set; }
}