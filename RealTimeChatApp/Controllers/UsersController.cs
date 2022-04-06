using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace RealTimeChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {


        [HttpGet]
        public async Task<IEnumerable<int>> GetLastRow()
        {
            List<int> usersCount = new List<int>();
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            var command = "SELECT * FROM public.users ORDER BY id DESC LIMIT 1";
            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();


            await using (var cmd = new NpgsqlCommand(command, conn))
            {
                await using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        var userId = reader.GetInt32(0);
                        usersCount.Add(userId);

                    }

                }

            }
            return usersCount;
        }






        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            string hashPassword = TokenManager.GenerateToken(user.Password);
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            var command = "INSERT INTO public.users (id, name, password) VALUES (@id, @name, @password);";
            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();


            await using (var cmd = new NpgsqlCommand(command, conn))
            {
                cmd.Parameters.AddWithValue("@id", user.Id);
                cmd.Parameters.AddWithValue("@name", user.Name);
                cmd.Parameters.AddWithValue("@password", hashPassword);

                await cmd.ExecuteNonQueryAsync();
            }
            return Ok("User created");
        }

    }
}

