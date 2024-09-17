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
            .OrderBy(r => r.Id)
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

    [HttpPost]
    public IActionResult Post([FromBody] CreateReportDTO createReportDTO)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (createReportDTO.ReportSubjectId <= 0)
        {
            ModelState.AddModelError("ReportSubjectId", "Report Subject Id must be a positive integer.");
            return BadRequest(ModelState);
        }

        Report newReport = new Report
        {
            Body = createReportDTO.Body,
            ReportAuthorId = createReportDTO.ReportAuthorId,
            ReportSubjectId = createReportDTO.ReportSubjectId,
            Closed = false
        };

        _dbContext.Reports.Add(newReport);
        _dbContext.SaveChanges();

        ReportDTO reportDTO = new ReportDTO
        {
            Id = newReport.Id,
            Body = newReport.Body,
            ReportAuthorId = newReport.ReportAuthorId,
            ReportSubjectId = newReport.ReportSubjectId,
            ReportAuthor = _dbContext.UserProfiles
                .Include(u => u.IdentityUser)
                .FirstOrDefault(u => u.Id == newReport.ReportAuthorId)?.IdentityUser.UserName,
            ReportSubject = _dbContext.UserProfiles
                .Include(u => u.IdentityUser)
                .FirstOrDefault(u => u.Id == newReport.ReportSubjectId)?.IdentityUser.UserName,
            Closed = newReport.Closed
        };


        return CreatedAtAction(nameof(GetById), new { id = newReport.Id }, reportDTO);
    }

    [HttpDelete("{id}")]
    //Authorize

    public IActionResult DeleteReport(int id)
    {
        Report? existingReport = _dbContext.Reports.Find(id);
        if (existingReport == null)
        {
            return NotFound();
        }

        _dbContext.Reports.Remove(existingReport);
        _dbContext.SaveChanges();

        return NoContent();

    }

    [HttpPut("{id}/close")]
    public IActionResult CloseReport(int id)
    {
        var report = _dbContext.Reports.FirstOrDefault(r => r.Id == id);

        if (report == null)
        {
            return NotFound();
        }

        if (report.Closed)
        {
            return BadRequest("Report is already closed.");
        }

        report.Closed = true;
        _dbContext.SaveChanges();

        return NoContent();
    }
}