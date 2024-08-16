namespace MemoryMuseum.Models.DTOs;

public class ReportDTO
{
    public int Id { get; set; }

    public string? Body  {get; set; }
 
    public int ReportAuthorId { get; set; }

    public int ReportSubjectId { get; set; }

    public bool Closed { get; set; }

    public UserProfileDTO? ReportAuthor { get; set; }

    public UserProfileDTO? ReportSubject { get; set; }
}