using System;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Authentication_Demo_Project.Model.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Authentication_Demo_Project.Domain;
using Microsoft.Extensions.Logging;

namespace Authentication_Demo_Project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILogger<AuthenticationController> logger;
        private readonly AppSettings appSettings;
        public IAuthenticationDomain authenticationDomain;

        public AuthenticationController(IOptions<AppSettings> options, IAuthenticationDomain authenticationDomain, ILogger<AuthenticationController> logger)
        {
            appSettings = options.Value;
            this.authenticationDomain = authenticationDomain;
            this.logger = logger;

        }
        
        [HttpPost]

        public IActionResult Authenticate([FromBody] Authentication authenticateRequest)
        {
            AuthenticateResponse authenticateResponse = new AuthenticateResponse();

            var getUser = authenticationDomain.GetByAsync(authenticateRequest);

            if (getUser.Result != null)
            {
                authenticateResponse.Id = getUser.Result.Id;
                authenticateResponse.FirstName = getUser.Result.FirstName;
                authenticateResponse.LastName = getUser.Result.LastName;
                authenticateResponse.Username = getUser.Result.Username;

                var token = GenerateToken();

                if (token.ToString() != null)
                {
                    authenticateResponse.Token = token.ToString();
                }
                return Ok(authenticateResponse);

            }
            else
            {
                return Unauthorized("Invalid UserName or Password");
            }


        }

        private string GenerateToken()
        {
            try
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.Secret));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(appSettings.issuer,
                  appSettings.audience,
                  null,
                  expires: DateTime.Now.AddMinutes(120),
                  signingCredentials: credentials);

                logger.LogInformation(MyLogEvents.GenerateItems, "TokenGenerated");
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch
            {
                logger.LogError(MyLogEvents.GenerateItems, "Generate Token error");
                return null;
            }

        }
    }
}

