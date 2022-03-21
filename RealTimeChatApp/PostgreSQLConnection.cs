using System;
using Npgsql;

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


        public string CommandStringForPostingMessages(int id, int userId, string text, DateTime date, int channelId)
        {
            var command = $"INSERT INTO public.Messages (message_id, user_id, text, created_date, channel_id) VALUES ({id}, {userId}, {text}, {date}, {channelId});";
            return command;
        }

        public string CommandStringForRetrievingMessages(DateTime date, int channelId)
        {
            var command = $"SELECT * FROM public.Messages WHERE created_date = {date} AND channel_id = {channelId};";
            return command;
        }


        public async void PostUserOrMessage(string command)
        {
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";
           
            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();

            await using (var cmd = new NpgsqlCommand(command, conn))
            {

                await cmd.ExecuteNonQueryAsync();
            }

        }

        public async void GetUserOrMessages(string command)
        {
            var connectionString = "Server=127.0.0.1; Port=5432; Database=chat_app; User Id=postgres; Password=Hello1234";

            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();

            await using (var cmd = new NpgsqlCommand(command, conn))
            await using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                     reader.GetString(0);
                   
                }
            }

        }


    }
}
