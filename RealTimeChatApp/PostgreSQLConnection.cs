using System;
using Npgsql;
using System.Diagnostics;
using System.Data;
using System.Threading.Tasks;

namespace RealTimeChatApp
{
    public class PostgreSQLConnection
    {

        public string CommandStringForPostingAUser(int id, string name, string password)
        {
            var command = $"INSERT INTO public.Users (id, name, password) VALUES ({id}, {name}, {password});";
            return command;
        }

        public string CommandStringForGettingAUser(string name, string password)
        {
            var command = $"SELECT * FROM public.Users WHERE name = {name} AND password = {password};";
            return command;
        }


     

        public async void GetUser(string command)
        {
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
           

            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();

            await using (var cmd = new NpgsqlCommand(command, conn))
            await using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    var user = $"Id: {reader.GetInt32(0)}, Name: {reader.GetString(1)};";
 
                }
            }

        }
    }
}
