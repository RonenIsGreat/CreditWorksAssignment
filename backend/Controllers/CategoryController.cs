using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
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
        public IEnumerable<Category> Get()
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                return entities.Categories.OrderBy(m => m.MinCategoryWeightGrams).ToList();
            }
        }

        // GET /Category/{id}
        [HttpGet("{id}")]
        public Category? Get(int id)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                return entities.Categories.FirstOrDefault(e => e.CategoryId == id);
            }
        }

        // POST /Category
        [HttpPost]
        public HttpResponseMessage Post([FromBody] Category Category)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                // Don't allow to have 2 categories with the same min weight
                var existingCategoryWithSameWeight = entities.Categories.FirstOrDefault(e => e.MinCategoryWeightGrams == Category.MinCategoryWeightGrams);
                if (existingCategoryWithSameWeight != null)
                {
                    return new HttpResponseMessage(HttpStatusCode.Conflict);
                }

                entities.Categories.Add(Category);
                entities.SaveChanges();

                return new HttpResponseMessage(HttpStatusCode.Created);
            }
        }

        // PUT /Category/{id}
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] Category updatedCategory)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                var Category = entities.Categories.FirstOrDefault(e => e.CategoryId == id);
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
                var existingCategoryWithSameWeight = entities.Categories.FirstOrDefault(e => e.CategoryId != updatedCategory.CategoryId &&
                                                                                         e.MinCategoryWeightGrams == updatedCategory.MinCategoryWeightGrams);
                if (existingCategoryWithSameWeight != null)
                {
                    return new HttpResponseMessage(HttpStatusCode.Conflict);
                }
                Category.Name = updatedCategory.Name;
                Category.MinCategoryWeightGrams = updatedCategory.MinCategoryWeightGrams;
                Category.Icon = updatedCategory.Icon;
                entities.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }

        // DELETE /Category/{id}
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            using (CreditWorksContext entities = new CreditWorksContext())
            {
                var Category = entities.Categories.FirstOrDefault(e => e.CategoryId == id);
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
                entities.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }
    }
}
