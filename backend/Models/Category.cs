using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Category
{
    [Key]
    public int CategoryId { get; set; }

    [StringLength(128)]
    public required string Name { get; set; }

    // We use grams so we won't need floating point.
    // The wights for the category are from this value up to the next closest category min weight.
    public required long MinCategoryWeightGrams { get; set; }

    [StringLength(128)]
    public required string Icon { get; set; }
}
