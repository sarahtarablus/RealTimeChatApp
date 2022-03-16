using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace RealTimeChatApp
{
    public class Program
    {
        public static void Main(string[] args)
        {

            CreateHostBuilder(args).Build().Run();

            string connectionString = "User ID=sarahtarablus;Password=z1x2c3;Host=localhost;Port=5432;Database=RealTimeChatApp;Pooling=true;Min Pool Size=0;Max Pool Size=100;Connection Lifetime=0;";
            var factorySession = SessionFactoryBuilder.BuildSession(connectionString, true, true);
            using var session = factorySession.OpenSession();
            using (var transaction = session.BeginTransaction())
            {
                var user1 = new User { Id = 2, Name = "Sam", CreatedDate = new DateTime().Date };
                var channel1 = new Channels { Id = 1, Name = "Sports" };
                var message = new Messages
                {
                    Id = 1,
                    userId = user1,
                    text = "Hello Mike",
                    CreatedDate = new DateTime().Date,
                    ChannelId = channel1
                };
                session.SaveOrUpdate(message);
                transaction.Commit();
                
            }

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });


        public static void StartSession()
        {

            string connectionString = "User ID=sarahtarablus;Password=z1x2c3;Host=localhost;Port=5432;Database=RealTimeChatApp;Pooling=true;Min Pool Size=0;Max Pool Size=100;Connection Lifetime=0;";
            var factorySession = SessionFactoryBuilder.BuildSession(connectionString, true, true);
            using var session = factorySession.OpenSession();
            using (var transaction = session.BeginTransaction())
            {
                var user1 = new User { Id = 2, Name = "Sam", CreatedDate = new DateTime().Date };
                var channel1 = new Channels { Id = 1, Name = "Sports" };
                var message = new Messages
                {
                    Id = 1,
                    userId = user1,
                    text = "Hello Mike",
                    CreatedDate = new DateTime().Date,
                    ChannelId = channel1
                };
                session.SaveOrUpdate(message);
                transaction.Commit();
                Console.WriteLine("created message" + message.Id);
            }
        }
    }
}
