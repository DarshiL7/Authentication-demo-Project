using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Authentication_Demo_Project.Token.core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Authentication_Demo_Project.Model.DbEntities;
using Microsoft.EntityFrameworkCore;
using Authentication_Demo_Project.Token.Interface;
using Authentication_Demo_Project.Token.Core;
using Authentication_Demo_Project.Model.Models;
using Authentication_Demo_Project.Services;
using Authentication_Demo_Project.Domain;
using Authentication_Demo_Project.StartupBase;
using System.IO;

namespace Authentication_Demo_Project
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<UserContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("UserAuthenticationDb")));
            services.AddCors(options =>
            {
                options.AddPolicy("http://localhost:4200",
                  builder =>
                  {
                      builder.WithOrigins("http://localhost:4200").AllowAnyHeader()
                                    .AllowAnyMethod().AllowCredentials();
                  });
            });
            services.AddSecurity(Configuration);
            services.AddScoped<IUserDomain, UserDomain>();
            services.AddTransient<IJwtTokenProvider, JwtTokenProvider>();
            services.AddScoped<IAuthenticationDomain, AuthenticationDomain>();
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            services.AddScoped<IRepository<User>, Repository<User>>();
            services.AddScoped<IRepository<Authentication>, Repository<Authentication>>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "Test.com",
                    ValidAudience = "Test.com",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is my secret string to generate jwt token"))
                };
                options.Authority = Configuration["Auth:issuer"];
                options.Audience = Configuration["Auth:Audience"];
                options.RequireHttpsMetadata = false;
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            var path = Directory.GetCurrentDirectory();
            loggerFactory.AddFile($"{path}\\Logs\\Log.txt");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.  
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseCors("http://localhost:4200");
            app.UseAuthentication();
            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(endpoints => endpoints
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseMiddleware<JwtMiddleware>();
        }
    }
}