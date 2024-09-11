using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.DTO;



namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ClientsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClientsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ClientDto>>> GetClients()
    {
        var clients = await _context.Clients
            .Include(c => c.FundingSource)
            .Select(c => new ClientDto
            {
                Id = c.Id,
                Name = c.Name,
                DateOfBirth = c.DateOfBirth,
                MainLanguage = c.MainLanguage,
                SecondaryLanguage = c.SecondaryLanguage,
                FundingSourceId = c.FundingSourceId,
                FundingSourceName = c.FundingSource.Name
            })
            .ToListAsync();

        return Ok(clients);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ClientDto>> GetClient(int id)
    {
        var client = await _context.Clients
            .Include(c => c.FundingSource)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (client == null)
        {
            return NotFound();
        }

        // Map Client entity to ClientDto before returning
        var clientDto = new ClientDto
        {
            Id = client.Id,
            Name = client.Name,
            DateOfBirth = client.DateOfBirth,
            MainLanguage = client.MainLanguage,
            SecondaryLanguage = client.SecondaryLanguage,
            FundingSourceId = client.FundingSourceId,
        };

        return Ok(clientDto);
    }

    [HttpPost]
    public async Task<IActionResult> CreateClient([FromBody] ClientDto clientDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var fundingSource = await _context.FundingSources.FindAsync(clientDto.FundingSourceId);
        if (fundingSource == null)
        {
            return BadRequest("Invalid FundingSourceId");
        }

        var client = new Client
        {
            Name = clientDto.Name,
            DateOfBirth = clientDto.DateOfBirth,
            MainLanguage = clientDto.MainLanguage,
            SecondaryLanguage = clientDto.SecondaryLanguage,
            FundingSourceId = clientDto.FundingSourceId,
            FundingSource = fundingSource
        };

        _context.Clients.Add(client);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }

        return CreatedAtAction(nameof(GetClient), new { id = client.Id }, clientDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutClient(int id, [FromBody] ClientDto clientDto)
    {
        if (!ModelState.IsValid || id != clientDto.Id)
        {
            return BadRequest(ModelState);
        }

        var existingClient = await _context.Clients.FindAsync(id);
        if (existingClient == null)
        {
            return NotFound();
        }

        // Update client properties
        existingClient.Name = clientDto.Name;
        existingClient.DateOfBirth = clientDto.DateOfBirth;
        existingClient.MainLanguage = clientDto.MainLanguage;
        existingClient.SecondaryLanguage = clientDto.SecondaryLanguage;
        existingClient.FundingSourceId = clientDto.FundingSourceId;

        try
        {
            await _context.SaveChangesAsync();
        }

        catch (DbUpdateConcurrencyException ex)
        {
            return StatusCode(500, $"Concurrency error: {ex.Message}");
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteClient(int id)
    {
        var client = await _context.Clients.FindAsync(id);
        if (client == null)
        {
            return NotFound();
        }

        _context.Clients.Remove(client);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }

        return NoContent();
    }
}
