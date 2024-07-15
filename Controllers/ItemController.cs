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

        Exhibit exhibit = _dbContext.Exhibits.SingleOrDefault(e => e.Id == item.ExhibitId);
        if (exhibit == null)
        {
            return NotFound("Exhibit not found");
        }

        Item newItem = new Item
        {

            Image = item.Image,
            Name = item.Name,
            UserProfileId = item.UserProfileId,
            ExhibitId = item.ExhibitId,
            Placard = item.Placard,
            DatePublished = DateTime.Now,
            NeedsApproval = exhibit.UserProfileId != item.UserProfileId,
            Approved = exhibit.UserProfileId == item.UserProfileId
        };

        try
        {
            _dbContext.Items.Add(newItem);
            _dbContext.SaveChanges();
        }
        catch (Exception ex)
        {


            return StatusCode(500, "An error occurred while creating the item.");
        }

        return CreatedAtAction(nameof(GetItemById), new { id = newItem.Id }, newItem);
    }

    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetItemById(int id)
    {
        ItemDTO? item = _dbContext.Items
            .Include(i => i.UserProfile)
                .ThenInclude(up => up.IdentityUser)
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
    [HttpPut("{id}")]
    //Authorize
    public async Task<IActionResult> UpdateItem(int id, 
    [FromForm] string name, 
    [FromForm] string placard, 
    [FromForm] IFormFile image = null, 
    [FromForm] string imageUrl = null)
    {

        Item existingItem = _dbContext.Items
        .SingleOrDefault(i => i.Id == id);
        if (existingItem == null)
        {
            return NotFound();
        }

        existingItem.Name = name;
        existingItem.Placard = placard;

        if (image != null && image.Length > 0)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "client", "public", "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var filePath = Path.Combine(uploadsFolder, image.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            existingItem.Image = $"/uploads/{image.FileName}";
        }
        else if (!string.IsNullOrEmpty(imageUrl))
        {
            existingItem.Image = imageUrl;
        }
        else
        {
            return BadRequest("Either image or imageURL must be provided.");
        }

        _dbContext.Entry(existingItem).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();

        return Ok(existingItem);
    }

    [HttpDelete("{id}")]
    //[Authorize]
    public IActionResult DeleteItem(int id)
    {
        Item? existingItem = _dbContext.Items.Find(id);
        if (existingItem == null)
        {
            return NotFound();
        }

        _dbContext.Items.Remove(existingItem);
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpGet("needing-approval/{id}")]
    public IActionResult GetItemsNeedingApproval(int id)
    {
        List<ItemDTO> items = _dbContext.Items
            .Include(i => i.Exhibit)
            .Include(i => i.UserProfile)
            .Where(i => i.NeedsApproval == true && i.Exhibit.UserProfileId == id)
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
                Exhibit = new ExhibitDTO
                {
                    Id = i.Exhibit.Id,
                    Name = i.Exhibit.Name,
                    UserProfileId = i.Exhibit.UserProfileId
                },
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
                }
            }).ToList();

        return Ok(items);
    }

    [HttpGet("not-approved/{id}")]
    public IActionResult GetNotApprovedItems(int id)
    {
        List<ItemDTO> items = _dbContext.Items
            .Include(i => i.Exhibit)
                .ThenInclude(e => e.UserProfile)
                    .ThenInclude(up => up.IdentityUser)
            .Where(i => i.Approved == false && i.UserProfileId == id)
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
                Exhibit = new ExhibitDTO
                {
                    Id = i.Exhibit.Id,
                    Name = i.Exhibit.Name,
                    UserProfileId = i.Exhibit.UserProfileId,
                    UserProfile = new UserProfileDTO
                    {
                        Id = i.Exhibit.UserProfile.Id,
                        FirstName = i.Exhibit.UserProfile.FirstName,
                        LastName = i.Exhibit.UserProfile.LastName,
                        Address = i.Exhibit.UserProfile.Address,
                        Email = i.Exhibit.UserProfile.IdentityUser.Email,
                        CreateDateTime = i.Exhibit.UserProfile.CreateDateTime,
                        UserName = i.Exhibit.UserProfile.IdentityUser.UserName,
                        IdentityUserId = i.Exhibit.UserProfile.IdentityUserId
                    }
                },
            }).ToList();

        return Ok(items);
    }

    [HttpPut("approve/{id}")]
    public IActionResult ApproveItem(int id)
    {
        Item existingItem = _dbContext.Items.Find(id);
        if (existingItem == null)
        {
            return NotFound();
        }

        existingItem.Approved = true;
        existingItem.NeedsApproval = false;

        _dbContext.Entry(existingItem).State = EntityState.Modified;
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPut("reject/{id}")]
    public IActionResult RejectItem(int id)
    {
        Item existingItem = _dbContext.Items.Find(id);
        if (existingItem == null)
        {
            return NotFound();
        }

        existingItem.NeedsApproval = false;

        _dbContext.Entry(existingItem).State = EntityState.Modified;
        _dbContext.SaveChanges();

        return NoContent();
    }
}