using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Npgsql;

namespace RealTimeChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        //static List<Messages> messages = new List<Messages>(); 

        [HttpGet]
        public async Task<IEnumerable<Messages>> GetAsync()//DateTime date, int channelId)
        {
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            //var command = $"SELECT * FROM public.Messages WHERE created_date = {date} AND channel_id = {channelId};";
            var command2 = "SELECT * FROM public.messages";
            var messages = new List<Messages>();


            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();

            await using (var cmd = new NpgsqlCommand(command2, conn))
            await using (var reader = await cmd.ExecuteReaderAsync())
            {
          
                while (await reader.ReadAsync())
                {
                    var message = new Messages()
                    {
                        Id = reader.GetInt32(0),
                        UserId = reader.GetInt32(1),
                        Text = reader.GetString(2),
                        CreatedDate = reader.GetDateTime(3),
                        ChannelId = reader.GetInt32(4)
                    };
                    messages.Add(message);
                }
            }
            return messages;
            
        }



        [HttpPost]
        public async Task PostAsync([FromBody] Messages message)
        {
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            var command = $"INSERT INTO public.messages (message_id, user_id, text, created_date, channel_id) VALUES (@message_id, @user_id, @text, @created_date, @channel_id);";// ({message.Id}, {message.UserId}, {message.Text}, {message.CreatedDate}, {message.ChannelId});";
            
            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();

            await using (var cmd = new NpgsqlCommand(command, conn))
            {
                cmd.Parameters.AddWithValue("message_id", message.Id);
                cmd.Parameters.AddWithValue("user_id", message.UserId);
                cmd.Parameters.AddWithValue("text", message.Text);
                cmd.Parameters.AddWithValue("created_date", message.CreatedDate);
                cmd.Parameters.AddWithValue("channel_id", message.ChannelId);
               await cmd.ExecuteNonQueryAsync();
            }
            //messages.Add(message);
        }

      
    }
}
