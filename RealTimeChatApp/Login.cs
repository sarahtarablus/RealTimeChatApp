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
            string password = TokenManager.GenerateToken(user.Password);
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            var command = "SELECT * FROM public.users WHERE name=@name AND password=@password";
            var users = new List<UserAndToken>();

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
            parameter2.Value = password;

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
                        if(_user == null)
                        {
                            return null;
                        }
                        var token = TokenManager.GenerateToken(_user.Name);
                        var userWithToken = new UserAndToken
                        {
                            Id = _user.Id,
                            Name = _user.Name,
                            Token = token
                        };
                        users.Add(userWithToken);
                    }

                }
            }
            if(users == null)
            {
                return null;
            }

            return Ok(users);

            
        }


    }
}
