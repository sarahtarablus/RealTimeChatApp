using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace RealTimeChatApp
{
    public class Messages: IEntity
    {

        public virtual string UserName { get; set; }
        public virtual int UserId { get; set; }
        public virtual string Text { get; set; }
        public virtual int ChannelId { get; set; }
        public virtual int Id { get; set; }


        public async Task<IActionResult> SendMessage(Messages message)
        { 
          
                   var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
                    var command = $"INSERT INTO public.messages (user_id, text, created_date, channel_id, user_name, id) VALUES (@user_id, @text, @created_date, @channel_id, @user_name, @id);";
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
                        cmd.Parameters.AddWithValue("id", message.Id);
                        await cmd.ExecuteNonQueryAsync();
                    }
                    
                    var msg = new MessageFromUser();
                    msg.UserName = message.UserName;
                    msg.Message = message.Text;
                    msg.ChannelId = message.ChannelId;
                    msg.Id = message.Id;
            
            return (IActionResult)msg;

        }



    }
}
