using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors]
    public class ManufacturerController : ControllerBase
    {
        // GET: /Manufacturer
        [HttpGet]
        public IEnumerable<Manufacturer> Get()
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                return entities.Manufacturers.ToList();
            }
        }

        // GET /Manufacturer/{id}
        [HttpGet("{id}")]
        public Manufacturer? Get(int id)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                return entities.Manufacturers.FirstOrDefault(e => e.Id == id);
            }
        }

        // POST /Manufacturer
        [HttpPost]
        public HttpResponseMessage Post([FromBody] Manufacturer Manufacturer)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                entities.Manufacturers.Add(Manufacturer);
                entities.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.Created);
            }
        }

        // PUT /Manufacturer/{id}
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] Manufacturer updatedManufacturer)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                var Manufacturer = entities.Manufacturers.FirstOrDefault(e => e.Id == id);
                if (Manufacturer == null)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                }
                Manufacturer.Name = updatedManufacturer.Name;
                entities.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }

        // DELETE /Manufacturer/{id}
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                var Manufacturer = entities.Manufacturers.FirstOrDefault(e => e.Id == id);
                if (Manufacturer == null)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                }
                entities.Manufacturers.Remove(Manufacturer);
                entities.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }
    }
}
