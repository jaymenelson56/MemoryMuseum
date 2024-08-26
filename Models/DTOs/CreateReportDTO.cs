namespace MemoryMuseum.Models.DTOs
{
    public class CreateReportDTO
    {
        public string? Body { get; set; }
        
        public int ReportAuthorId { get; set; }

        public int ReportSubjectId { get; set; }

        public bool Closed { get; set; }
    }
}