using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Authentication_Demo_Project.StartupBase
{
    public static class Security
    {
        private readonly static string AllowMySpecificOrigins = "http://localhost:4200";

        public static void UseSecurity(this IApplicationBuilder applicationBuilder, IWebHostEnvironment environment)
        {
            applicationBuilder.UseCors(AllowMySpecificOrigins);
            applicationBuilder.UseAuthorization();
            applicationBuilder.UseRouting();
            applicationBuilder.HandleException();
            applicationBuilder.SetSecurityHeaders();
        }

        public static void AddSecurity(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            serviceCollection.AddDataProtection();
            serviceCollection.AddCors(options =>
            {
                options.AddPolicy(AllowMySpecificOrigins,
                  builder =>
                  {
                      builder.WithOrigins(AllowMySpecificOrigins).AllowAnyHeader()
                                    .AllowAnyMethod().AllowCredentials();
                  });
            });
            serviceCollection.AddAuthorization();
        }


        private static void HandleException(this IApplicationBuilder applicationBuilder)
        {

            applicationBuilder.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    var errorFeature = context.Features.Get<IExceptionHandlerFeature>();
                    var exception = errorFeature.Error;
                    context.Response.ContentType = "application/json;";
                    await context.Response.WriteAsync("Error Has Occured.");
                });
            });
        }

        private static void SetSecurityHeaders(this IApplicationBuilder applicationBuilder)
        {
            applicationBuilder.Use((context, next) =>
            {
                context.Response.Headers["X-XSS-Protection"] = "1; mode=block";
                context.Response.Headers["X-Frame-Options"] = "DENY";
                context.Response.Headers["X-Content-Type-Options"] = "NOSNIFF";
                context.Response.Headers["Strict-Transport-Security"] = "max-age=31536000";
                context.Response.Headers["X-Permitted-Cross-Domain-Policies"] = "master-only";
                context.Response.Headers["Content-Security-Policy"] = "default-src 'none'; style-src 'self'; img-src 'self'; font-src 'self'; script-src 'self'";
                return next();
            });
        }

    }
}
