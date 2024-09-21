using System.Net;
using System.Runtime.CompilerServices;
using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors]
    public class TestController : ControllerBase
    {
        [HttpGet("1")]
        public async Task<dynamic?> Get1()
        {
            using (CreditWorksContext context = new CreditWorksContext())
            {
                var query = from manufacturer in context.Manufacturers
                    join vehicle in context.Vehicles
                    on manufacturer.ManufacturerId equals vehicle.ManufacturerId into vehiclesGroup
                    select new { 
                        name = manufacturer.Name, 
                        count = vehiclesGroup.Count(),
                        weights = vehiclesGroup.Select(v => v.WeightInGrams),
                        MaxWeight =  vehiclesGroup.Any() ? vehiclesGroup.Max(v => v.WeightInGrams) : 0,
                        AvgWeight =  vehiclesGroup.Any() ? vehiclesGroup.Average(v => v.WeightInGrams) : 0,
                    };

                return await query.ToArrayAsync();
            }
        }

        [HttpGet("2")]
        public async Task<dynamic> Get2()
        {
            using (CreditWorksContext context = new CreditWorksContext())
            {
                var query = context.Manufacturers
                            .Where(m => m.Vehicles.Count() > 0)
                            .OrderByDescending(m => m.Vehicles.Count())
                            .Select(m => new { m.Name, num = m.Vehicles.Count()});
                return await query.ToArrayAsync();
            }
        }

        [HttpGet("3")]
        public async Task<dynamic> Get3()
        {
            using (CreditWorksContext context = new CreditWorksContext())
            {
                var query = from vehicle in context.Vehicles
                    let manufacturerName = vehicle.Manufacturer != null ? vehicle.Manufacturer.Name : "Unknown"
                    select new {
                        vehicle.VehicleId,
                        manufacturerName
                    };

                // same
                var query2 = from vehicle in context.Vehicles
                    join manufacturer in context.Manufacturers
                    on vehicle.ManufacturerId equals manufacturer.ManufacturerId
                    select new { vehicle.VehicleId, manufacturer.Name };
                return await query.ToArrayAsync();
            }
        }

        [HttpPost("AddVehicles")]
        public async Task<HttpResponseMessage> Post()
        {
            Vehicle testVehicle = new Vehicle(){
                OwnerName = "test",
                ManufacturerId=1,
                Year=1000,
                WeightInGrams=1000
            };
            using (CreditWorksContext context = new CreditWorksContext())
            {
                context.Vehicles.Add(testVehicle); 
                context.Vehicles.Add(testVehicle); // same object ref, will be added only once
                await context.SaveChangesAsync();
                return new HttpResponseMessage(HttpStatusCode.Created);
            }
        }

        [HttpDelete("DeleteManufacturerWithVehicles/{id}")]
        public async Task<HttpResponseMessage> Delete(int id){
            using (CreditWorksContext context = new CreditWorksContext())
            {
                var manufacturer = await context.Manufacturers
                .Include(m => m.Vehicles)
                .FirstOrDefaultAsync(m => m.ManufacturerId == id);

                if(manufacturer == null){
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                }
                context.Vehicles.RemoveRange(manufacturer.Vehicles);
                context.Manufacturers.Remove(manufacturer);
                await context.SaveChangesAsync();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }

        [HttpGet("toyota")]
        public async Task<dynamic> GetToyotaVehicles()
        {
            using (CreditWorksContext context = new CreditWorksContext())
            {
                var query = from vehicle in context.Vehicles
                    join manufacturer in context.Manufacturers
                    on vehicle.ManufacturerId equals manufacturer.ManufacturerId
                    where manufacturer.Name == "Toyota"
                    select vehicle;

                var query2 = from vehicle in context.Vehicles
                    where vehicle.Manufacturer != null && vehicle.Manufacturer.Name == "Toyota"
                    select vehicle;

                var query3 = context.Vehicles.Join(
                    context.Manufacturers,
                    v => v.ManufacturerId, 
                    m => m.ManufacturerId, 
                    (v, m) => new {v, m}
                    )
                    .Where(g => g.m.Name == "Toyota")
                    .Select(g => g.v);
                return await query3.ToArrayAsync();
            }
        }

        [HttpGet("moreThan5kg")]
        public async Task<dynamic> GetMoreThan5()
        {
            using (CreditWorksContext context = new CreditWorksContext())
            {
                var query = from vehicle in context.Vehicles
                    where vehicle.WeightInGrams > 5000
                    orderby vehicle.Year ascending
                    select vehicle;

                var query2 = context.Vehicles
                    .Where(v => v.WeightInGrams > 5000)
                    .OrderBy(v => v.Year);
                return await query2.ToArrayAsync();
            }
        }

        [HttpGet("MaxVehiclForCategory")]
        public async Task<dynamic> MaxVehiclForCategory()
        {
            using (CreditWorksContext context = new CreditWorksContext())
            {
                var vehiclesWithCategory = from vehicle in context.Vehicles
                    from category in context.Categories
                    where vehicle.WeightInGrams >= category.MinCategoryWeightGrams
                    group new 
                    {
                        vehicle.VehicleId,    
                        vehicle.OwnerName,
                        vehicle.WeightInGrams,
                        category.CategoryId,
                        category.MinCategoryWeightGrams,
                        category.Name
                    } 
                    by vehicle into vehicleGroup
                    select new
                    {
                        Vehicle = vehicleGroup.Key,
                        CategoryId = vehicleGroup.OrderByDescending(v => v.MinCategoryWeightGrams).First().CategoryId
                    };

                var categoryWithMaxVehicle = from category in context.Categories
                    join vwc in vehiclesWithCategory
                    on category.CategoryId equals vwc.CategoryId into categoriesGroup
                    let MaxVehicleWeight = categoriesGroup.Any() ? categoriesGroup.Max(i => i.Vehicle.WeightInGrams) : 0
                    select new
                    {
                        CategoryName = category.Name,
                        MaxVehicleWeight
                    };

                return await categoryWithMaxVehicle.ToArrayAsync();
            }
        }

        [HttpGet("CategoryWithNumberOfVehicles")]
        public async Task<dynamic> CategoryWithNumberOfVehicles()
        {
            using (CreditWorksContext context = new CreditWorksContext())
            {
                var vehiclesWithCategory = from category in context.Categories
                    from vehicle in context.Vehicles
                    where category.MinCategoryWeightGrams <= vehicle.WeightInGrams
                    group category by vehicle into vehicleGroup
                    select new {
                        Vehicle = vehicleGroup.Key,
                        Category = vehicleGroup.OrderByDescending(c => c.MinCategoryWeightGrams).First()
                    };

                var query = from category in context.Categories
                    join vwc in vehiclesWithCategory
                    on category.CategoryId equals vwc.Category.CategoryId into categoryGroup
                    select new {
                        categotyName = category.Name,
                        vehiclesCount = categoryGroup.Count(),
                    };

                return await query.ToArrayAsync();
            }
        }

        [HttpGet("TotalWeightForManufacturers")]
        public async Task<dynamic> TotalWeightForManufacturers()
        {
            using (CreditWorksContext context = new CreditWorksContext())
            {
                var query = from manufacturer in context.Manufacturers
                    join vehicle in context.Vehicles
                    on manufacturer.ManufacturerId equals vehicle.ManufacturerId into manufacturerVehicles
                    select new {
                        ManufacturerName = manufacturer.Name,
                        TotalWeight = manufacturerVehicles.Sum(v => v.WeightInGrams)
                    };
                return await query.ToArrayAsync();
            }
        }

        [HttpGet("ManufacturersWithoutVehicles")]
        public async Task<dynamic> ManufacturersWithoutVehicles()
        {
            using (CreditWorksContext context = new CreditWorksContext())
            {
                var query = from manufacturer in context.Manufacturers
                    join vehicle in context.Vehicles
                    on manufacturer.ManufacturerId equals vehicle.ManufacturerId into manufacturerVehicles
                    where !manufacturerVehicles.Any()
                    select manufacturer.Name;
                return await query.ToArrayAsync();
            }
        }

        [HttpGet("between")]
        public async Task<dynamic> between()
        {
            using (CreditWorksContext context = new CreditWorksContext())
            {
                var query = from vehicle in context.Vehicles
                    from category in context.Categories
                    where vehicle.WeightInGrams >= category.MinCategoryWeightGrams
                    && !context.Categories.Any(c2 => c2.MinCategoryWeightGrams > category.MinCategoryWeightGrams
                                                    && vehicle.WeightInGrams >= c2.MinCategoryWeightGrams)
                    select new 
                    {
                        vehicle.VehicleId,
                        vehicle.OwnerName,
                        vehicle.WeightInGrams,
                        CategoryName = category.Name
                    };
                return await query.ToArrayAsync();
            }
        }

        [HttpGet("between2")]
        public async Task<dynamic> between2()
        {
            using (CreditWorksContext context = new CreditWorksContext())
            {
                var query = from vehicle in context.Vehicles
                    let category = context.Categories
                                        .Where(c => vehicle.WeightInGrams >= c.MinCategoryWeightGrams)
                                        .OrderByDescending(c => c.MinCategoryWeightGrams)
                                        .FirstOrDefault()
                    let categoryName = category != null ? category.Name : "Unknown"
                    select new 
                    {
                        vehicle.VehicleId,
                        vehicle.WeightInGrams,
                        CategoryName = category.Name
                    };
                return await query.ToArrayAsync();
            }
        }
    }
}
