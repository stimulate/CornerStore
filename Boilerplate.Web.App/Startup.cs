using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using JavaScriptEngineSwitcher.ChakraCore;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using React.AspNet;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Boilerplate.Web.App.Models;
using System;
using System.Threading.Tasks;
using System.Threading;

namespace Boilerplate.Web.App
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddNodeServices();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddReact();
            services.AddJsEngineSwitcher(options => options.DefaultEngineName = ChakraCoreJsEngine.EngineName)
             .AddChakraCore();
            services.AddMvc();            
            var connection = @"Server=MIU\MSSQLSERVER02;Database=SDJR1;Trusted_Connection=True;ConnectRetryCount=0";
            services.AddDbContext<SDJR1Context>(options => options.UseSqlServer(connection));
        }

        public interface INodeServices : IDisposable
        {
            Task<T> InvokeAsync<T>(string moduleName, params object[] args);
            Task<T> InvokeAsync<T>(CancellationToken cancellationToken, string moduleName, params object[] args);

            Task<T> InvokeExportAsync<T>(string moduleName, string exportedFunctionName, params object[] args);
            Task<T> InvokeExportAsync<T>(CancellationToken cancellationToken, string moduleName, string exportedFunctionName, params object[] args);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                //app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true,
                    HotModuleReplacementEndpoint = "/dist/__webpack_hmr"
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseReact(config =>
            {
                config
                    .SetLoadBabel(false)
                    .AddScriptWithoutTransform("~/wwwroot/dist/app.bundle.js");
            });
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                  name: "spa-fallback",
                  defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
