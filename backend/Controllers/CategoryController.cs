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
    public class CategoryController : ControllerBase
    {
        // GET /Category
        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                return await entities.Categories.OrderBy(m => m.MinCategoryWeightGrams).ToListAsync();
            }
        }

        // GET /Category/{id}
        [HttpGet("{id}")]
        public async Task<Category?> Get(int id)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                return await entities.Categories.FirstOrDefaultAsync(e => e.CategoryId == id);
            }
        }

        // POST /Category
        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody] Category Category)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                // Don't allow to have 2 categories with the same min weight
                var existingCategoryWithSameWeight = await entities.Categories.FirstOrDefaultAsync(e => e.MinCategoryWeightGrams == Category.MinCategoryWeightGrams);
                if (existingCategoryWithSameWeight != null)
                {
                    return new HttpResponseMessage(HttpStatusCode.Conflict);
                }

                entities.Categories.Add(Category);
                await entities.SaveChangesAsync();

                return new HttpResponseMessage(HttpStatusCode.Created);
            }
        }

        // PUT /Category/{id}
        [HttpPut("{id}")]
        public async Task<HttpResponseMessage> Put(int id, [FromBody] Category updatedCategory)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                var Category = await entities.Categories.FirstOrDefaultAsync(e => e.CategoryId == id);
                var message = new HttpResponseMessage();
                if (Category == null)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                }

                // Don't allow to change weight of the first category starting from zero weight
                if (Category.MinCategoryWeightGrams == 0 && updatedCategory.MinCategoryWeightGrams != 0)
                {
                    return new HttpResponseMessage(HttpStatusCode.Conflict);
                }

                // Don't allow to have 2 categories with the same min weight
                var existingCategoryWithSameWeight = await entities.Categories.FirstOrDefaultAsync(e => e.CategoryId != updatedCategory.CategoryId &&
                                                                                         e.MinCategoryWeightGrams == updatedCategory.MinCategoryWeightGrams);
                if (existingCategoryWithSameWeight != null)
                {
                    return new HttpResponseMessage(HttpStatusCode.Conflict);
                }
                Category.Name = updatedCategory.Name;
                Category.MinCategoryWeightGrams = updatedCategory.MinCategoryWeightGrams;
                Category.Icon = updatedCategory.Icon;
                await entities.SaveChangesAsync();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }

        // DELETE /Category/{id}
        [HttpDelete("{id}")]
        public async Task<HttpResponseMessage> Delete(int id)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                var Category = await entities.Categories.FirstOrDefaultAsync(e => e.CategoryId == id);
                var message = new HttpResponseMessage();
                if (Category == null)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                }

                // Don't allow to delete the first category with zero weight
                if (Category.MinCategoryWeightGrams == 0)
                {
                    return new HttpResponseMessage(HttpStatusCode.Conflict);
                }

                entities.Categories.Remove(Category);
                await entities.SaveChangesAsync();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }
    }
}
