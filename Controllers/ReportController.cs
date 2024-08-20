using Microsoft.AspNetCore.Mvc;
using MemoryMuseum.Models;
using MemoryMuseum.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using MemoryMuseum.Models.DTOs;

namespace MemoryMuseum.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ReportController : ControllerBase
{
    private MemoryMuseumDbContext _dbContext;

    public ReportController(MemoryMuseumDbContext context)
    {
        _dbContext = context;
    }
    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Reports
        .OrderBy(r => r.Id)
        .Include(r => r.ReportAuthor)
        .Include(r => r.ReportSubject)
        .Select(r => new Report
        {
            Id = r.Id,
            Body = r.Body,
            ReportAuthorId = r.ReportAuthorId,
            ReportSubjectId = r.ReportSubjectId,
            Closed = r.Closed

        }));
    }
}