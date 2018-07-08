using Microsoft.AspNetCore.Mvc;

namespace PsychEval.Illness.Application
{
    [Route("api/[controller]")]
    public sealed class IllnessController : Controller 
    {

        [HttpGet]
        public ActionResult Get()
        {
            return Ok();
        }
    }
}