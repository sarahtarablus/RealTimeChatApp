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
            var command = "SELECT * FROM public.users WHERE name=@name";
            List<User> userToken = new List<User>();

            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();
            
            NpgsqlParameter parameter = new NpgsqlParameter();
            parameter.ParameterName = "@name";
            parameter.NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Varchar;
            parameter.Direction = System.Data.ParameterDirection.Input;
            parameter.Value = user.Name;

            await using (var cmd = new NpgsqlCommand(command, conn))
            {
                cmd.Parameters.Add(parameter);

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
                        var password = TokenManager.ValidateToken(_user.Password);
                        if (user.Password == password)
                        {
                            var token = TokenManager.GenerateToken(_user.Name);
                            var userFound = new User()
                            {
                                Id = _user.Id,
                                Name = token,
                                Password = ""
                            };
                            userToken.Add(userFound);
                        }
                        else return null;
                    }

                }
            }

            return Ok(userToken);

            
        }


    }
}
