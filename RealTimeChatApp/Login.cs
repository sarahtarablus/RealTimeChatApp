using System;
using System.Collections;
using System.Collections.Generic;
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
        private Dictionary<string, string> Users = new Dictionary<string, string>();
        private List<LoginUser> _users = new List<LoginUser>();
        private string Name { get; set; }
        private string Password { get; set; }

       

        [HttpPost]
        public async Task<IActionResult> PostUser([FromForm] LoginUser user)
        {
            var body = new StreamReader(HttpContext.Request.Body);
            var requestBody = await body.ReadToEndAsync();
            var loginUser = JsonConvert.DeserializeObject<LoginUser>(requestBody);
            Users.Add(key: loginUser.Name, value: loginUser.Password);

            foreach(KeyValuePair<string,string> kvp in Users)
            {
                Name = kvp.Key;
                Password = kvp.Value;
            }

            var userIsFound = await GetAsync(Name, Password);






            return Ok(userIsFound);
          
        }



        [HttpGet]
        public async Task<IEnumerable<User>> GetAsync(string name, string password)
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
            parameter.Value = name;

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
                        var user = new User()
                        {
                            Id = reader.GetInt32(0),
                            Name = reader.GetString(1),
                            Password = reader.GetString(2)

                        };
                        if(user == null)
                        {
                            throw new ArgumentNullException("User not found");
                        }
                        users.Add(user);
                    }

                }
            }

            return users;
        }
    }
}
