using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;



namespace RealTimeChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Messages> Get()
        {
            return messages;
        }

        static List<Messages> messages = new List<Messages>();

        [HttpPost]
        public void Post([FromBody] Messages message)
        {
            messages.Add(message);
        }

      
    }
}
