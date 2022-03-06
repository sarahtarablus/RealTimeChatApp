using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RealTimeChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        
        [HttpGet]
        public IActionResult ReadMessages()
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult PostMessage(JObject payload)
        {
            return Ok(payload);
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok();
        }

        [HttpGet]
        public IActionResult GetSingleUser(int id)
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult CreateUser(JObject payload)
        {
            return Ok(payload);
        }
    }
}
