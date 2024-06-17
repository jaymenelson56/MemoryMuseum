using MemoryMuseum.Data;
using MemoryMuseum.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using MemoryMuseum.Models;

namespace MemoryMuseum.Controllers;

[ApiController]
[Route("api/[controller]")]

public class RatingController : ControllerBase
{
    private MemoryMuseumDbContext _dbContext;

    public RatingController(MemoryMuseumDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    //[Authorize]

    public IActionResult Get()
    {
        return Ok(_dbContext
        .Ratings
        .Select(r => new Rating
        {
            Id = r.Id,
            RatingName = r.RatingName,
            Value = r.Value
        })
        .ToList());
    }

};