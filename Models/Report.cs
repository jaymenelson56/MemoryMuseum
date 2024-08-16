using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.SignalR;
using Microsoft.OpenApi.Models;

namespace MemoryMuseum.Models;

public class Report
{
    public int Id { get; set; }

    public string? Body  {get; set; }
    [Required]

    public int ReportAuthorId { get; set; }
    [Required]

    public int ReportSubjectId { get; set; }

    public bool Closed { get; set; }

    [ForeignKey(nameof(ReportAuthorId))]
    public UserProfile? ReportAuthor { get; set; }

    [ForeignKey(nameof(ReportSubjectId))]
    public UserProfile? ReportSubject { get; set; }
}