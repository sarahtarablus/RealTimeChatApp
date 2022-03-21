﻿using System;
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
           
            PostgreSQLConnection connection = new PostgreSQLConnection();
            var connectionString = connection.CommandStringForGettingAUser("jen", "1234");
            connection.GetRow(connectionString);
         

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });


    }
}
