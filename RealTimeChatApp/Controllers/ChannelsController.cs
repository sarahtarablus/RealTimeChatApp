using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using Microsoft.AspNetCore.SignalR;

namespace RealTimeChatApp
{
    [Route("api/[controller]")]
    public class ChannelsController : Controller
    {
        private readonly IHubContext<ChatHub> _chatHub;

        public ChannelsController(IHubContext<ChatHub> chatHub) {
            _chatHub = chatHub;
        }

      
        [HttpGet]
        public async Task<IEnumerable<Channels>> GetAsync()
        {
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            var command = "SELECT * FROM public.channels";
            var channels = new List<Channels>();

            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();

            await using (var cmd = new NpgsqlCommand(command, conn))
            {
                await using (var reader = await cmd.ExecuteReaderAsync())
                {

                    while (await reader.ReadAsync())
                    {
                        var channel = new Channels()
                        {
                            Id = reader.GetInt32(0),
                            Name = reader.GetString(1),
                        };
                        channels.Add(channel);
                    }
                }
            }
            return channels;
        }


    }
}
