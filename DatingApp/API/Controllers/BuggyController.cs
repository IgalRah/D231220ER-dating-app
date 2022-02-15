using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }

        // 401 unauthorize
        [Authorize]
        [HttpGet("auth")] // Buggy/auth
        public ActionResult<string> GetSecret(){
            return "Secret String";
        }

        [HttpGet("bot-found")]
        public ActionResult<AppUser> GetNotFound(){
            var thing = _context.Users.Find(-1);
            if(thing == null){
                return NotFound();
            }

            return Ok();
        }
    }
}