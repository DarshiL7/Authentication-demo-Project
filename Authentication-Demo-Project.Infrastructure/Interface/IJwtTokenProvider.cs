using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Authentication_Demo_Project.Token.Interface
{
    public interface IJwtTokenProvider
    {
        ClaimsPrincipal ValidateToken(string securityKey, string jsonWebToken);

        KeyValuePair<string, string> WriteToken(IEnumerable<Claim> claims, string issuer, string audience, DateTime expires);
    }
}
