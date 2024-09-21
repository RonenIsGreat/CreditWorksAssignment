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
    public class ManufacturerController : ControllerBase
    {
        // GET /Manufacturer
        [HttpGet]
        public async Task<IEnumerable<Manufacturer>> Get()
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                return await entities.Manufacturers.ToListAsync();
            }
        }

        // GET /Manufacturer/{id}
        [HttpGet("{id}")]
        public async Task<Manufacturer?> Get(int id)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                return await entities.Manufacturers.FirstOrDefaultAsync(e => e.ManufacturerId == id);
            }
        }

        // POST /Manufacturer
        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody] Manufacturer Manufacturer)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                entities.Manufacturers.Add(Manufacturer);
                await entities.SaveChangesAsync();
                return new HttpResponseMessage(HttpStatusCode.Created);
            }
        }

        // PUT /Manufacturer/{id}
        [HttpPut("{id}")]
        public async Task<HttpResponseMessage> Put(int id, [FromBody] Manufacturer updatedManufacturer)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                var Manufacturer = await entities.Manufacturers.FirstOrDefaultAsync(e => e.ManufacturerId == id);
                if (Manufacturer == null)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                }
                Manufacturer.Name = updatedManufacturer.Name;
                await entities.SaveChangesAsync();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }

        // DELETE /Manufacturer/{id}
        [HttpDelete("{id}")]
        public async Task<HttpResponseMessage> Delete(int id)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                var Manufacturer = await entities.Manufacturers.FirstOrDefaultAsync(e => e.ManufacturerId == id);
                if (Manufacturer == null)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                }
                
                var VehicleWithCategory = await entities.Vehicles.FirstOrDefaultAsync(v => v.ManufacturerId == Manufacturer.ManufacturerId);
                if (VehicleWithCategory != null)
                {
                    return new HttpResponseMessage(HttpStatusCode.Conflict);
                }
                entities.Manufacturers.Remove(Manufacturer);
                await entities.SaveChangesAsync();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }
    }
}
