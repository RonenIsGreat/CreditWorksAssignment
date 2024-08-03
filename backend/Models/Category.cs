using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Category
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required float MinCategoryWeight { get; set; }

    public string? Icon { get; set; }
}
