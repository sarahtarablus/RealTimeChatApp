using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Npgsql;

namespace RealTimeChatApp
{
    public class Messages
    {

        public virtual string UserName { get; set; }
        public virtual int UserId { get; set; }
        public virtual string Text { get; set; }
        public virtual int ChannelId { get; set; }


        public async Task<IEnumerable<Messages>> GetMessages()//DateTime createdDate, int channelId)
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
            parameter.Value = 2022-04-20;

            NpgsqlParameter parameter2 = new NpgsqlParameter();
            parameter2.ParameterName = "@channel_id";
            parameter2.NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Bigint;
            parameter2.Direction = System.Data.ParameterDirection.Input;
            parameter2.Value = 1;



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
                            ChannelId = reader.GetInt32(3)
                        };
                        messages.Add(message);
                    }
                }
            }
            return messages;

        }

    }
}
