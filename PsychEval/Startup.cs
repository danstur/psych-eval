using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PsychEval.Illness;
using Scrutor;
using Swashbuckle.AspNetCore.Swagger;

namespace PsychEval
{
    public sealed class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private string GetVersion(int fields) => $"v{Assembly.GetExecutingAssembly().GetName().Version.ToString(fields)}";

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            Encoding.RegisterProvider(new Utf8NoBomEncodingProvider());
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(GetVersion(1), new Info { Title = "Psych-Evaluation", Version = GetVersion(3) });
            });
            services.AddCors();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddSingleton(IllnessParserConfiguration.Create(@"C:\tmp\data.csv"));
            services.Scan(x =>
                x.FromEntryAssembly()
                    .AddClasses()
                    .UsingRegistrationStrategy(RegistrationStrategy.Skip)
                    .AsImplementedInterfaces()
                    .AsSelf()
                    .WithTransientLifetime()
            );
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors(builder =>
                    builder
                        .AllowAnyMethod()
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                );
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint($"/swagger/{GetVersion(1)}/swagger.json", $"Psych-Evaluation API {GetVersion(3)}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
            });
        }
    }
}
