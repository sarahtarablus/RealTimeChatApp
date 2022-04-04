using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.Json;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;


namespace RealTimeChatApp
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
  

        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] LoginUser user)
        {

            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            var command = "SELECT * FROM public.users WHERE name=@name AND password=@password";
            var users = new List<User>();

            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();



            NpgsqlParameter parameter = new NpgsqlParameter();
            parameter.ParameterName = "@name";
            parameter.NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Varchar;
            parameter.Direction = System.Data.ParameterDirection.Input;
            parameter.Value = user.Name;

            NpgsqlParameter parameter2 = new NpgsqlParameter();
            parameter2.ParameterName = "@password";
            parameter2.NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Varchar;
            parameter2.Direction = System.Data.ParameterDirection.Input;
            parameter2.Value = user.Password;

            await using (var cmd = new NpgsqlCommand(command, conn))
            {
                cmd.Parameters.Add(parameter);
                cmd.Parameters.Add(parameter2);

                await using (var reader = await cmd.ExecuteReaderAsync())
                {

                    while (await reader.ReadAsync())
                    {
                        var _user = new User()
                        {
                            Id = reader.GetInt32(0),
                            Name = reader.GetString(1),
                            Password = reader.GetString(2)

                        };
                        users.Add(_user);
                    }

                }
            }

            return Ok(users);

            
        }


    }
}
