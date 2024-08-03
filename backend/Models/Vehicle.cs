using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Vehicle
{
    [Key]
    public int VehicleId { get; set; }

    [StringLength(128)]
    public required string OwnerName { get; set; }

    [ForeignKey("ManufacturerId")]
    public required int ManufacturerId { get; set; }
    public virtual Manufacturer? Manufacturer { get; set; }
    

    public required int Year { get; set; }

    // We use grams so we won't need floating point
    public required int WeightInGrams { get; set; }
}