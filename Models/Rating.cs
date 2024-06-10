using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;

namespace MemoryMuseum.Models;

public class Rating
{
    public int Id { get; set; }
    
    [Required]
    public string RatingName { get; set; }
}