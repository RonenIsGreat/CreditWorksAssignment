using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public partial class CreditWorksContext : DbContext
{
    public CreditWorksContext() {}

    public CreditWorksContext(DbContextOptions<CreditWorksContext> options) : base(options) {}

    public virtual DbSet<Manufacturer> Manufacturers { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Vehicle> Vehicles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // This is the connection string to access the MSSQL server. Change the user id and password to your own
        // TODO: use connection string from configuration
        optionsBuilder.UseSqlServer("Server=localhost; Database=CreditWorks_RonenRossin; User Id=sa; Password=YourStrong!Passw0rd; Trusted_Connection=true; MultipleActiveResultSets=true; TrustServerCertificate=true; integrated security=false;");
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
