using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public partial class CreditWorksContext : DbContext
{
    public CreditWorksContext(DbContextOptions<CreditWorksContext> options) : base(options) { }

    public CreditWorksContext(): base() { }

    public virtual DbSet<Manufacturer> Manufacturers { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Vehicle> Vehicles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // This is the connection string to access the MSSQL server. Change the user id and password to your own
        // Should move this to a configuration file
        string connectionString = "User Id=sa; Password=YourStrong!Passw0rd; Server=localhost; Database=CreditWorks_RonenRossin; Trusted_Connection=true; MultipleActiveResultSets=true; TrustServerCertificate=true; integrated security=false;";
        optionsBuilder.UseSqlServer(connectionString)
        .LogTo(Console.WriteLine);  // Log SQL queries to the console
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Manufacturer>(entity =>
        {
            entity.HasKey(e => e.ManufacturerId);
            entity.Property(e => e.ManufacturerId).HasColumnName("ID");
            entity.Property(e => e.Name).HasMaxLength(128);
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId);
            entity.Property(e => e.CategoryId).HasColumnName("ID");
            entity.Property(e => e.Name).HasMaxLength(128);
            entity.Property(e => e.Icon).HasMaxLength(128);
        });

        modelBuilder.Entity<Vehicle>(entity =>
        {
            entity.HasKey(e => e.VehicleId);
            entity.Property(e => e.VehicleId).HasColumnName("ID");
            entity.Property(e => e.OwnerName).HasMaxLength(128);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
