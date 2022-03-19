using System;
using Npgsql;

namespace RealTimeChatApp
{
    public class PostgreSQLConnection
    {
        

        public async void AddUser()
        {
            var connectionString = "Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=itsawonderfulworld";

            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();
            await using (var cmd = new NpgsqlCommand("INSERT INTO public.users (id,name,password) VALUES (3, 'Julia', 2123)", conn))
            {              

                await cmd.ExecuteNonQueryAsync();
            }
           
        }
    }
}
