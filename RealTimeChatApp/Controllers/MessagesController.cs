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

namespace RealTimeChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {

        private readonly IHubContext<MessageHub> _messageHub;

        public MessagesController(IHubContext<MessageHub> messageHub)
        {

            _messageHub = messageHub;
        }



        [HttpGet]//("{channelId}")]
        public async Task<IEnumerable<MessageFromUser>> GetMessages()//(int channelId)
        {
            List<MessageFromUser> messages = new List<MessageFromUser>();
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            var command = "SELECT * FROM public.messages";// WHERE channel_id=@channel_id";

            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();


            await using (var cmd = new NpgsqlCommand(command, conn))
            {
                //cmd.Parameters.AddWithValue("channel_id", channelId);
                await using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        var message = new MessageFromUser()
                        {
                            UserName = reader.GetString(4),
                            Message = reader.GetString(1),
                            ChannelId = reader.GetInt32(3)
                        };

                        messages.Add(message);
                    }

                }

            }
            await _messageHub.Clients.All.SendAsync("ReceiveMessages", messages);
            return messages;
        }






        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] Messages message)
        {
            string authHeader = this.HttpContext.Request.Headers["Authorization"];
            if (authHeader != null && authHeader.StartsWith("Bearer"))
            {               
                string encodedToken = authHeader.Substring("Bearer".Length).Trim();
                string encodedUsername = encodedToken.Substring(1, encodedToken.Length - 2);               
                var username = TokenManager.ValidateToken(encodedUsername);
                if(username == message.UserName)
                {
                    var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
                    var command = $"INSERT INTO public.messages (user_id, text, created_date, channel_id, user_name) VALUES (@user_id, @text, @created_date, @channel_id, @user_name);";
                    DateTime date = DateTime.Now;

                    await using var conn = new NpgsqlConnection(connectionString);
                    await conn.OpenAsync();

                    await using (var cmd = new NpgsqlCommand(command, conn))
                    {
                        cmd.Parameters.AddWithValue("user_id", message.UserId);
                        cmd.Parameters.AddWithValue("text", message.Text);
                        cmd.Parameters.AddWithValue("created_date", date);
                        cmd.Parameters.AddWithValue("channel_id", message.ChannelId);
                        cmd.Parameters.AddWithValue("user_name", message.UserName);
                        await cmd.ExecuteNonQueryAsync();
                    }
                    var msg = new MessageFromUser();
                    msg.UserName = message.UserName;
                    msg.Message = message.Text;
                    msg.ChannelId = message.ChannelId;
                    await _messageHub.Clients.All.SendAsync("ReceiveMessage", msg);
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
