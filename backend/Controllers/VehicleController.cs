using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
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
        public IEnumerable<Vehicle> Get()
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                return entities.Vehicles.ToList();
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
        public HttpResponseMessage Post([FromBody] Vehicle vehicle)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                entities.Vehicles.Add(vehicle);
                entities.SaveChanges();

                return new HttpResponseMessage(HttpStatusCode.Created);
            }
        }

        // PUT /Vehicle/{id}
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] Vehicle updatedVehicle)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                var vehicle = entities.Vehicles.FirstOrDefault(e => e.VehicleId == id);
                var message = new HttpResponseMessage();
                if (vehicle == null)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                }
                vehicle.OwnerName = updatedVehicle.OwnerName;
                vehicle.ManufacturerId = updatedVehicle.ManufacturerId;
                vehicle.Year = updatedVehicle.Year;
                vehicle.WeightInGrams = updatedVehicle.WeightInGrams;
                entities.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }

        // DELETE /Vehicle/{id}
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
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
                entities.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }
    }
}
