using Microsoft.EntityFrameworkCore;
using Server.Models;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Client> Clients { get; set; }
    public DbSet<FundingSource> FundingSources { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure relationships
        modelBuilder.Entity<Client>()
            .HasOne(c => c.FundingSource)
            .WithMany(f => f.Clients)
            .HasForeignKey(c => c.FundingSourceId);

        // setup default data for the FundingSource table
        modelBuilder.Entity<FundingSource>().HasData(
                    new FundingSource { Id = 1, Name = "NDIS" },
                    new FundingSource { Id = 2, Name = "HCP" },
                    new FundingSource { Id = 3, Name = "CHSP" },
                    new FundingSource { Id = 4, Name = "DVA" },
                    new FundingSource { Id = 5, Name = "HACC" }
            );


    }


}