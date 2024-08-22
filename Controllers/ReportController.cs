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
        .ThenInclude(ra => ra.IdentityUser)
        .Include(r => r.ReportSubject)
        .ThenInclude(rs => rs.IdentityUser)
        .Select(r => new ReportDTO
        {
            Id = r.Id,
            Body = r.Body,
            ReportAuthorId = r.ReportAuthorId,
            ReportSubjectId = r.ReportSubjectId,
            ReportAuthor = r.ReportAuthor.IdentityUser.UserName,
            ReportSubject = r.ReportSubject.IdentityUser.UserName,
            Closed = r.Closed

        }));
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var report = _dbContext.Reports
            .Include(r => r.ReportAuthor)
            .ThenInclude(ra => ra.IdentityUser)
            .Include(r => r.ReportSubject)
            .ThenInclude(rs => rs.IdentityUser)
            .Select(r => new ReportDTO
            {
                Id = r.Id,
                Body = r.Body,
                ReportAuthorId = r.ReportAuthorId,
                ReportSubjectId = r.ReportSubjectId,
                ReportAuthor = r.ReportAuthor.IdentityUser.UserName,
                ReportSubject = r.ReportSubject.IdentityUser.UserName,
                Closed = r.Closed
            })
            .FirstOrDefault(r => r.Id == id);

        if (report == null)
        {
            return NotFound();
        }

        return Ok(report);
    }

}