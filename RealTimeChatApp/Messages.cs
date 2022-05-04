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




        public async Task<MessageFromUser> SendMessage(Messages message, DateTime date)
        {
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            var command = $"INSERT INTO public.messages (user_id, text, created_date, channel_id, user_name, id) VALUES (@user_id, @text, @created_date, @channel_id, @user_name, @id);";

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
            msg.Date = date;

            return msg;

        }




        public async Task<List<MessageFromUser>> GetMessages(ChannelId channelId)
        {
            List<MessageFromUser> messages = new List<MessageFromUser>();
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            var command = "SELECT * FROM public.messages WHERE channel_id=@channel_id ORDER BY id";

            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();

            NpgsqlParameter parameter = new NpgsqlParameter();
            parameter.ParameterName = "@channel_id";
            parameter.NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Bigint;
            parameter.Direction = System.Data.ParameterDirection.Input;
            parameter.Value = channelId.Id;

            await using (var cmd = new NpgsqlCommand(command, conn))
            {
                cmd.Parameters.Add(parameter);
                await using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        var message = new MessageFromUser()
                        {
                            UserName = reader.GetString(4),
                            Message = reader.GetString(1),
                            ChannelId = reader.GetInt32(3),
                            Id = reader.GetInt32(5),
                            Date = reader.GetDateTime(2)
                        };

                        messages.Add(message);
                    }

                }

            }
            return messages;
        }




       public async Task<IEnumerable<int>> GetLastRow()
        {
            List<int> messagesCount = new List<int>();
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            var command = "SELECT * FROM public.messages ORDER BY id DESC LIMIT 1";

            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();


            await using (var cmd = new NpgsqlCommand(command, conn))
            {
                await using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        var messagesId = reader.GetInt32(5);
                        messagesCount.Add(messagesId);

                    }

                }

            }
            return messagesCount;
        }



    }
}
