using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Linq;

using System.Threading.Tasks;
using Authentication_Demo_Project.Model.Models;
using Authentication_Demo_Project.Token.Core;
using System.Security.Claims;
using Authentication_Demo_Project.Token.Interface;

namespace Authentication_Demo_Project.Token.core
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate requestDelegate;
        private readonly AppSettings appSettings;
        private readonly IJwtTokenProvider jwtTokenProvider;

        public JwtMiddleware(RequestDelegate requestDelegate, IOptions<AppSettings> appSettings, IJwtTokenProvider jwtTokenProvider)
        {
            this.requestDelegate = requestDelegate;
            this.appSettings = appSettings.Value;
            this.jwtTokenProvider = jwtTokenProvider;

        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault();

            if (token != null)
                attachUserToContext(token, context);

            await requestDelegate(context);
        }

        public ClaimsPrincipal ValidateToken(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault();
            if (token != "")
            {
                var key = JwtTokenProvider.Tokens[token];
                var dbToken = context.Request.Headers["Authorization"].FirstOrDefault();
                return string.IsNullOrEmpty(dbToken) ? null : jwtTokenProvider.ValidateToken(key, dbToken);
            }
            return null;
        }


        public void attachUserToContext(string token, HttpContext context)
        {
            try
            {

                var key = JwtTokenProvider.Tokens[token];
                jwtTokenProvider.ValidateToken(key, token);
                context.Items["User"] = context.User;
            }
            catch (Exception e)
            {

                throw e;
            }

        }

        
    }
}
