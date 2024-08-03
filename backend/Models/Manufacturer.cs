using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Manufacturer
{
    [Key]
    public int ManufacturerId { get; set; }

    [StringLength(128)]
    public required string Name { get; set; }

}
