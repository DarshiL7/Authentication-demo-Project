using System.Collections.Generic;
using System.Threading.Tasks;

using Authentication_Demo_Project.Domain;
using Authentication_Demo_Project.Token.core;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Authentication_Demo_Project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> logger;
        public IUserDomain userDomain;
            
        public UserController(IUserDomain userDomain, ILogger<UserController> logger)
        {
            this.userDomain = userDomain;
            this.logger = logger;
        }

        // GET: api/<UserController>
       [HttpGet]
       public async Task<IEnumerable<User>> GetAll()
        {
            return await userDomain.GetAllAsync();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<User> GetBy(int id)
        {
            
            var userGet = await userDomain.GetByAsync(id);
            if (userGet == null)
            {
                logger.LogWarning(MyLogEvents.GetItemNotFound, "Get({Id}) NOT FOUND", id);
                return null;
            }
            logger.LogInformation("The UserId " + id + " is accessed");
            return userGet;
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [AllowAnonymous]
        // POST api/<UserController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            var checkUser = userDomain.CheckUserAsync(user);

            if (checkUser.Result == null)
            {
                var userEntity = await userDomain.AddAsync(user);
                logger.LogInformation("The User is created");
                return Created($"{HttpContext.Request.Path.ToUriComponent()}/{userEntity.Id}", 0);
            }
            else
            {
                return Unauthorized("username or password already exist");
            }

            
        }

        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] User user)
        {
            await userDomain.UpdateAsync(user);
            logger.LogInformation("The UserId " + id + " is updated");
            return NoContent();
        }

        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await userDomain.GetByAsync(id);
            if (user != null)
            {
                await userDomain.DeleteAsync(user);
                logger.LogInformation("The UserId " + id + " is deleted");
                return NoContent();
            }
            return NotFound();
        }
    }
}
