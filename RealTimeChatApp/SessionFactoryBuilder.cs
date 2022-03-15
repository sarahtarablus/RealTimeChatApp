using System;
using System.Configuration;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;

namespace RealTimeChatApp
{
    public class SessionFactoryBuilder
    {
        private static NHibernate.Cfg.Configuration config;

        public static ISessionFactory BuildSessionFactory
         (string connectionStringName, bool create = false, bool update = false)
        {
            return Fluently.Configure()
            .Database(PostgreSQLConfiguration.Standard
            .ConnectionString(ConfigurationManager.ConnectionStrings[connectionStringName].ConnectionString))
            //.Mappings(m => entityMappingTypes.ForEach(e => { m.FluentMappings.Add(e); }))
            .Mappings(m => m.FluentMappings.AddFromAssemblyOf<NHibernate.Cfg.Mappings>())
            .CurrentSessionContext("call")
            .ExposeConfiguration(cfg => BuildSchema(cfg, create, update))
            .BuildSessionFactory();
        }

        private static void BuildSchema(NHibernate.Cfg.Configuration cfg, bool create = false, bool update = false)
        {
            if (create)
            {
                new SchemaExport(config).Create(false, true);
            }
            else
            {
                new SchemaUpdate(config).Execute(false, update);
            }
        }
    }
}
