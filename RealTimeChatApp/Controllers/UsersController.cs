using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace RealTimeChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private List<User> usersList = new List<User>();
        
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
                        users.Add(user);
                    }

                }
            }

            return users;
        }



        [HttpPost]
        public void PostUser([FromBody] User user)
        {
            var userLogin = new User()
            {
                Id = user.Id,
                Name = user.Name,
                Password = user.Password
            };
            usersList.Add(userLogin);
        }
            //var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            //var command = "INSERT INTO public.users (id, name, password) VALUES (@id, @name, @password);";

            //await using var conn = new NpgsqlConnection(connectionString);
            //await conn.OpenAsync();

            //await using (var cmd = new NpgsqlCommand(command, conn))
            //{
            //    cmd.Parameters.AddWithValue("@id", user.Id);
            //    cmd.Parameters.AddWithValue("@name", user.Name);
            //    cmd.Parameters.AddWithValue("@password", user.Password);

            //    await cmd.ExecuteNonQueryAsync();
            //}

        


        //[HttpPost]
        //public async Task<IEnumerable<User>> PostAsync([FromBody] User user)
        //{

        //    var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";

        //    var command = "SELECT * FROM public.users WHERE name=@name AND password=@password";
        //    var users = new List<User>();

        //    await using var conn = new NpgsqlConnection(connectionString);
        //    await conn.OpenAsync();

        //    NpgsqlParameter parameter = new NpgsqlParameter();
        //    parameter.ParameterName = "@name";
        //    parameter.NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Varchar;
        //    parameter.Direction = System.Data.ParameterDirection.Input;
        //    parameter.Value = user.Name;

        //    NpgsqlParameter parameter2 = new NpgsqlParameter();
        //    parameter2.ParameterName = "@password";
        //    parameter2.NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Varchar;
        //    parameter2.Direction = System.Data.ParameterDirection.Input;
        //    parameter2.Value = user.Password;



        //    await using (var cmd = new NpgsqlCommand(command, conn))
        //    {
        //        cmd.Parameters.Add(parameter);
        //        cmd.Parameters.Add(parameter2);
        //        await using (var reader = await cmd.ExecuteReaderAsync())
        //        {
        //            while (await reader.ReadAsync())
        //            {
        //                users.Add(new User()
        //                {
        //                    Id = reader.GetInt32(0),
        //                    Name = reader.GetString(1),
        //                    Password = reader.GetString(2)

        //                });
        //            }

        //        }
        //    }

        //    return users;

        //}

    }
}
