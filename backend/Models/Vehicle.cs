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
    
    public required int ManufacturerId { get; set; }

    public required int Year { get; set; }

    // We use grams so we won't need floating point
    public required long WeightInGrams { get; set; }
}