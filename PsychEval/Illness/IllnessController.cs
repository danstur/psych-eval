using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace PsychEval.Illness
{
    [Route("api/[controller]")]
    public sealed class IllnessController : Controller
    {
        private readonly ILogger<IllnessController> _logger;
        private readonly IllnessService _service;

        public IllnessController(ILogger<IllnessController> logger, IllnessService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public ActionResult<ICollection<IllnessEntity>> Get()
        {
            try
            {
                var illnesses = _service.GetIllnesses();
                return Ok(illnesses);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Could not parse Illnesses.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
