using Microsoft.EntityFrameworkCore;
using Server.Models; // Adjust namespace

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Client> Clients { get; set; }
    public DbSet<FundingSource> FundingSources { get; set; }
}