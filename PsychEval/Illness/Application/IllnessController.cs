using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace PsychEval.Illness.Application
{
    [Route("api/[controller]")]
    public sealed class IllnessController : Controller
    {

        [HttpGet]
        public ActionResult<ICollection<IllnessResponse>> Get()
        {
            var illnesses = new[]
            {
                new IllnessResponse("MD 1", "Some Illness", "Some weird behavior", new[]
                {
                    "Symptom A",
                    "Symptom B",
                }),
                new IllnessResponse("MD 2", "Some other Illness", "Slightly weird behavior", new[]
                {
                    "Symptom B",
                    "Symptom C",
                }),
            };
            return Ok(illnesses);
        }
    }
}