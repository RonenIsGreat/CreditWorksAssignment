using System.Net;
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
    }
}
