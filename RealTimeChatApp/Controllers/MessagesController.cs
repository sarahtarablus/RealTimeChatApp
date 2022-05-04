using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WebSocketSharp;
using WebSocketSharp.Server;
using Npgsql;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

namespace RealTimeChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {

        private readonly IHubContext<ChatHub> _chatHub;

        public MessagesController(IHubContext<ChatHub> chatHub)
        {

            _chatHub = chatHub;
        }



        [HttpGet]
        public async Task<IEnumerable<int>> Get()
        {
            var message = new Messages();
            var messagesCount = await message.GetLastRow();
            return messagesCount;
        }




        [HttpPost("GetMessages")]
        public async Task<IActionResult> GetMessages([FromBody] ChannelId channelId)
        {
            var message = new Messages();
            var messages = await message.GetMessages(channelId);
            await _chatHub.Clients.All.SendAsync("DisplayMessages", messages);
            return Ok(messages);
        }




        [HttpPost("PostMessages")]
        public async Task<IActionResult> PostMessages([FromBody] Messages message)
        {
            string authHeader = this.HttpContext.Request.Headers["Authorization"];
            if (authHeader != null && authHeader.StartsWith("Bearer"))
            {               
                string encodedToken = authHeader.Substring("Bearer".Length).Trim();
                string encodedUsername = encodedToken.Substring(1, encodedToken.Length - 2);               
                var username = TokenManager.ValidateToken(encodedUsername);
                if (username == message.UserName)
                {
                    var messageInstance = new Messages();
                    DateTime date = DateTime.Now;
                    var newMessage = await messageInstance.SendMessage(message, date);                    
                    await _chatHub.Clients.All.SendAsync("ReceiveMessage", newMessage);
                }
                else
                {
                    throw new Exception("The authentication token doesn't correspond to the user that sends this message");
                }
                
            }else
            {
                throw new Exception("The authorization header is either empty or isn't Bearer.");
            }
          
            return Ok("Message added successfully");
       
        }

    }
}
