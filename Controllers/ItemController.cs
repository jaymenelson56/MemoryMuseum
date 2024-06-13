using MemoryMuseum.Data;
using MemoryMuseum.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using MemoryMuseum.Models;

namespace MemoryMuseum.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ItemController : ControllerBase
{
    private MemoryMuseumDbContext _dbContext;

    public ItemController(MemoryMuseumDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    //Auhtorize
    public IActionResult CreateItem([FromBody] Item item)
    {
        if (item == null)
        {
            return BadRequest("Item data is null");
        };

        Item newItem = new Item
        {

            Image = item.Image,
            Name = item.Name,
            UserProfileId = item.UserProfileId,
            ExhibitId = item.ExhibitId,
            Placard = item.Placard,
            DatePublished = DateTime.Now,
            NeedsApproval = true,
            Approved = false,
        };

        _dbContext.Items.Add(newItem);
        _dbContext.SaveChanges();

        return CreatedAtAction(nameof(GetItemById), new { id = newItem.Id }, newItem);
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetItemById(int id)
    {
        ItemDTO? item = _dbContext.Items
            .Include(i => i.UserProfile)
            .Include(i => i.Exhibit)
            .Where(i => i.Id == id)
            .Select(i => new ItemDTO
            {
                Id = i.Id,
                Image = i.Image,
                Name = i.Name,
                UserProfileId = i.UserProfileId,
                ExhibitId = i.ExhibitId,
                Placard = i.Placard,
                DatePublished = i.DatePublished,
                NeedsApproval = i.NeedsApproval,
                Approved = i.Approved,
                UserProfile = new UserProfileDTO
                {
                    Id = i.UserProfile.Id,
                    FirstName = i.UserProfile.FirstName,
                    LastName = i.UserProfile.LastName,
                    Address = i.UserProfile.Address,
                    Email = i.UserProfile.IdentityUser.Email,
                    CreateDateTime = i.UserProfile.CreateDateTime,
                    UserName = i.UserProfile.IdentityUser.UserName,
                    IdentityUserId = i.UserProfile.IdentityUserId
                },
                Exhibit = new ExhibitDTO
                {
                    Id = i.Exhibit.Id,
                    Name = i.Exhibit.Name,
                    UserProfileId = i.Exhibit.UserProfileId
                }
            }).FirstOrDefault();

        if (item == null)
        {
            return NotFound();
        }

        return Ok(item);
    }
}