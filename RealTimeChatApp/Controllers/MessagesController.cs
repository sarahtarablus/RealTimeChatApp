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
    public class MessagesController : ControllerBase
    {
        
        [HttpGet]
        public IActionResult Get()
        {
            //List<Messages> messages = new List<Messages>();
            //Messages msg = new Messages();
            //msg._user = "Sarah";
            //msg._text = "Hello Sarah!";

            //messages.Add(msg);
            return Ok();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Messages message)
        {
            //List<Messages> messages = new List<Messages>();
            //messages.Add(message);
            return Ok();
        }

      
    }
}
