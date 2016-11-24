using SNSSubscriber.Infrastructure;
using System.Web.Http;

namespace SNSSubscriber
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Add custom message handler to change the content type. 
            config.MessageHandlers.Add(new SnsMessageHandler());

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
