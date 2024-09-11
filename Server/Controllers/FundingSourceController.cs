using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTO;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FundingSourcesController : ControllerBase
{
    private readonly AppDbContext _context;

    public FundingSourcesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/FundingSources
    [HttpGet]
    public async Task<ActionResult<IEnumerable<FundingSourceDto>>> GetFundingSources()
    {
        var fundingSources = await _context.FundingSources
            .Select(f => new FundingSourceDto
            {
                Id = f.Id,
                Name = f.Name
            })
            .ToListAsync();

        return Ok(fundingSources);
    }
}
