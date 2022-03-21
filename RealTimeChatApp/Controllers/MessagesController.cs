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
        static List<Messages> messages = new List<Messages>(); 

        [HttpGet]
        public IEnumerable<Messages> Get(DateTime date, int channelId)
        {
            PostgreSQLConnection connection = new PostgreSQLConnection();
            var connectionString = connection.CommandStringForRetrievingMessages(date, channelId);
            connection.GetUserOrMessages(connectionString);
            return messages;
        }

        [HttpPost]
        public void Post([FromBody] Messages message)
        {
            messages.Add(message);
        }

      
    }
}
