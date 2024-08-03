using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Vehicle
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required string Manufacturer { get; set; }

    public required string YearModel { get; set; }

    public required float Weight { get; set; }
}
