using System;
using System.Configuration;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Cfg.ConfigurationSchema;
using NHibernate.Tool.hbm2ddl;

namespace RealTimeChatApp
{
    public class SessionFactoryBuilder
    {
        private static ISessionFactory session;
      
        public static ISessionFactory BuildSession(string connectionStringName, bool create = false, bool update = false)
        {
            return (ISessionFactory)Fluently.Configure()
                 .Database(PostgreSQLConfiguration.Standard
                           .ConnectionString(ConfigurationManager.ConnectionStrings[connectionStringName].ConnectionString))
                 .Mappings(m => m.FluentMappings.AddFromAssemblyOf<NHibernate.Cfg.Mappings>())
                 .CurrentSessionContext("Call")
                 .ExposeConfiguration(cfg => BuildSchema((IHibernateConfiguration)cfg, create, update))
                 .BuildSessionFactory();
        }

        private static void BuildSchema(IHibernateConfiguration config, bool create = false, bool update = false)
        {
            if (create)
            {
                new SchemaExport((NHibernate.Cfg.Configuration)config).Create(false, true);
            }else
            {
                new SchemaUpdate((NHibernate.Cfg.Configuration)config).Execute(false, update);
            }
        }


       


     
        
        

       
    }
}
