using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors]
    public class VehicleController : ControllerBase
    {
        // GET /Vehicle
        [HttpGet]
        public async Task<IEnumerable<Vehicle>> Get()
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                return await entities.Vehicles.ToArrayAsync();
            }
        }

        // GET /Vehicle/{id}
        [HttpGet("{id}")]
        public Vehicle? Get(int id)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                return entities.Vehicles.FirstOrDefault(e => e.VehicleId == id);
            }
        }

        // POST Vehicle
        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody] Vehicle vehicle)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                entities.Vehicles.Add(vehicle);
                await entities.SaveChangesAsync();
                return new HttpResponseMessage(HttpStatusCode.Created);
            }
        }

        // PUT /Vehicle/{id}
        [HttpPut("{id}")]
        public async Task<HttpResponseMessage> Put(int id, [FromBody] Vehicle updatedVehicle)
        {
            using (CreditWorksContext context = new CreditWorksContext())
            {
                var vehicle = context.Vehicles.FirstOrDefault(e => e.VehicleId == id);
                var message = new HttpResponseMessage();
                if (vehicle == null)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                }
                vehicle.OwnerName = updatedVehicle.OwnerName;
                vehicle.ManufacturerId = updatedVehicle.ManufacturerId;
                vehicle.Year = updatedVehicle.Year;
                vehicle.WeightInGrams = updatedVehicle.WeightInGrams;
                await context.SaveChangesAsync();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }

        // DELETE /Vehicle/{id}
        [HttpDelete("{id}")]
        public async Task<HttpResponseMessage> Delete(int id)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                var vehicle = entities.Vehicles.FirstOrDefault(e => e.VehicleId == id);
                var message = new HttpResponseMessage();
                if (vehicle == null)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                }
                entities.Vehicles.Remove(vehicle);
                await entities.SaveChangesAsync();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }
    }
}
