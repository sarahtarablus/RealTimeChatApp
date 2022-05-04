using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace RealTimeChatApp
{



    public class User : IUser
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Password { get; set; }



        public async Task PostUser(User user, string hash)
        {

            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            var command = "INSERT INTO public.users (id, name, password) VALUES (@id, @name, @password);";

            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();


            await using (var cmd = new NpgsqlCommand(command, conn))
            {
                cmd.Parameters.AddWithValue("@id", user.Id);
                cmd.Parameters.AddWithValue("@name", user.Name);
                cmd.Parameters.AddWithValue("@password", hash);

                await cmd.ExecuteNonQueryAsync();
            }
        
        }



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




        public async Task<List<User>> FindUser(LoginUser user)
        {
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
            var command = "SELECT * FROM public.users WHERE name=@name";
            var loggedUser = new List<User>();

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


                        if (_user != null)
                        {
                            var passwordHasher = new PasswordHasher<string>();
                            var result = passwordHasher.VerifyHashedPassword(user.Name, _user.Password, user.Password);

                            if (result == PasswordVerificationResult.Success)
                            {
                                var token = TokenManager.GenerateToken(_user.Name);
                                var userFound = new User()
                                {
                                    Id = _user.Id,
                                    Name = _user.Name,
                                    Password = token
                                };
                                loggedUser.Add(userFound);
                            }

                        }

                    }

                }

            }
            return loggedUser;

        }




        public NewLoginUser GetUser(NewLoginUser user)
        {
            var newUser = new NewLoginUser()
            {
                Name = user.Name,
                Id = user.Id
            };
            return newUser;
        }


    }
}
