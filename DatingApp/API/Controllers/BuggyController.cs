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
        [HttpGet("auth")] // api/buggy/auth
        public ActionResult<string> GetSecret(){
            return "Secret String";
        }


        // 404 not found 
        [HttpGet("not-found")] // api/buggy/not-found
        public ActionResult<AppUser> GetNotFound(){
            var thing = _context.Users.Find(-1);
            if(thing == null){
                return NotFound();
            }
            return Ok();
        }


        // 500 server error
        [HttpGet("server-error")] // api/buggy/server-error
        public ActionResult<string> GerServerError(){
            var thing = _context.Users.Find(-1);
            var thingToString = thing.ToString(); // NullReferenceExaption: Thing is Null

            return thingToString; // will not return nothing!
        }
        

        [HttpGet("bad-request")] // api/buggy/bad-request
        public ActionResult<string> GetBadRequest(){
            return BadRequest("Bad request");
        }
    }
}