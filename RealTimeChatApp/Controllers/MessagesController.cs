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

namespace RealTimeChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {

        [HttpGet]
        public async Task<IEnumerable<Messages>> GetAsync(DateTime createdDate, int channelId)
        {
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            var command = "SELECT * FROM public.messages WHERE created_date=@created_date AND channel_id=@channel_id";
            var messages = new List<Messages>();


            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();

            NpgsqlParameter parameter = new NpgsqlParameter();
            parameter.ParameterName = "@created_date";
            parameter.NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Date;
            parameter.Direction = System.Data.ParameterDirection.Input;
            parameter.Value = createdDate;

            NpgsqlParameter parameter2 = new NpgsqlParameter();
            parameter2.ParameterName = "@channel_id";
            parameter2.NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Bigint;
            parameter2.Direction = System.Data.ParameterDirection.Input;
            parameter2.Value = channelId;



            await using (var cmd = new NpgsqlCommand(command, conn))
            {
                cmd.Parameters.Add(parameter);
                cmd.Parameters.Add(parameter2);
                await using (var reader = await cmd.ExecuteReaderAsync())
                {

                    while (await reader.ReadAsync())
                    {
                        var message = new Messages()
                        {

                            UserId = reader.GetInt32(0),
                            Text = reader.GetString(1),
                            CreatedDate = reader.GetDateTime(2),
                            ChannelId = reader.GetInt32(3)
                        };
                        messages.Add(message);
                    }
                }
            }
            return messages;
            
        }



        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] MessagesUsername message)
        {
            string authHeader = this.HttpContext.Request.Headers["Authorization"];
           
            if(authHeader != null && authHeader.StartsWith("Bearer"))
            {               
                string encodedToken = authHeader.Substring("Bearer".Length).Trim();
                string encodedUsername = encodedToken.Substring(1, encodedToken.Length - 2);               
                var username = TokenManager.ValidateToken(encodedUsername);
                if(username == message.UserName)
                {
                    var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
                    var command = $"INSERT INTO public.messages (user_id, text, created_date, channel_id) VALUES (@user_id, @text, @created_date, @channel_id);";

                    await using var conn = new NpgsqlConnection(connectionString);
                    await conn.OpenAsync();

                    await using (var cmd = new NpgsqlCommand(command, conn))
                    {
                        cmd.Parameters.AddWithValue("user_id", message.UserId);
                        cmd.Parameters.AddWithValue("text", message.Text);
                        cmd.Parameters.AddWithValue("created_date", message.CreatedDate);
                        cmd.Parameters.AddWithValue("channel_id", message.ChannelId);
                        await cmd.ExecuteNonQueryAsync();
                    }

                    WebSocketServer wssv = new WebSocketServer("ws://127.0.0.1:7890");
                    wssv.AddWebSocketService<ChatMessages>("/ChatMessages");
                    wssv.Start(); 
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


        //private static async Task Echo(WebSocket webSocket)
        //{
        //    var buffer = new byte[1024 * 4];
        //    var receiveResult = await webSocket.ReceiveAsync(
        //        new ArraySegment<byte>(buffer), CancellationToken.None);

        //    while (!receiveResult.CloseStatus.HasValue)
        //    {
        //        await webSocket.SendAsync(
        //            new ArraySegment<byte>(buffer, 0, receiveResult.Count),
        //            receiveResult.MessageType,
        //            receiveResult.EndOfMessage,
        //            CancellationToken.None);

        //        receiveResult = await webSocket.ReceiveAsync(
        //            new ArraySegment<byte>(buffer), CancellationToken.None);
        //    }

        //    await webSocket.CloseAsync(
        //        receiveResult.CloseStatus.Value,
        //        receiveResult.CloseStatusDescription,
        //        CancellationToken.None);
        //}


    }
}
